import re
import glob
import os.path
import pandas as pd
from typing import Literal, List
from datetime import datetime, timedelta



def filter_recent_files(files: List[str], seconds: int) -> List[str]:
    """
    Фильтрует список файлов, оставляя только те, что не старше (текущего времени - seconds - 24 часа).
    Предполагается, что имя файла начинается с даты в формате 'YYYY-MM-DD'.
    
    :param files: список строк с именами файлов
    :param seconds: количество секунд для фильтрации
    :return: отфильтрованный список файлов
    """
    now = datetime.now()
    cutoff = now - timedelta(seconds=seconds) - timedelta(hours=24)

    filtered_files = []

    for file in files:
        # Ищем дату в начале имени файла
        filename = os.path.basename(file)
        abspath = os.path.abspath(file)
        match = re.match(r"^(\d{4}-\d{2}-\d{2})", filename)
        if match:
            try:
                file_date = datetime.strptime(match.group(1), "%Y-%m-%d")
                if file_date >= cutoff:
                    filtered_files.append(abspath)
            except ValueError:
                # Пропускаем, если дата некорректная
                continue

    return filtered_files


def read_log_files(directory: str, format: Literal["csv", "json"], range: int):
    """
    Считывает все файлы формата csv или json из директории, 
        - объединяет
        - фильтрует по времени
        - отрезает в рамках интервала 
        - преобразует в большой json.

    :param directory: путь к директории с файлами
    :param format: "csv" или "json"
    :param range: интервал в секундах
    :return: объединённый json
    """

    if not os.path.isdir(directory):
        print(os.path.abspath(directory))
        raise FileNotFoundError(f"Директория не найдена: {directory}")
    
    response = '[{"cpu":"","mem":"","timestamp":"","pid":""}]'
    file_path_list = glob.glob(os.path.join(directory, "*."+format))
    if not file_path_list:
        print("Файлы не найдены.")
        return response
    else:
        print(file_path_list)
        file_path_list = filter_recent_files(file_path_list, range)
        if not file_path_list:
            return response

    now = datetime.now()
    cutoff = now - timedelta(seconds=range)
    dataframe = []

    for file in file_path_list:
        try:
            if format == "csv":
                df = pd.read_csv(file, delimiter="|")
            else:
                df = pd.read_json(file)
        except Exception as e:
            print(f"Ошибка при чтении файла {file}: {e}")

        df['timestamp'] = (df['DATE'] + ' ' + df['TIME']).astype('datetime64[ns]')
        df = df[["timestamp", "CPU", "MEM", "PID"]]
        df = df[(df["timestamp"] >= cutoff)]
        dataframe.append(df)

    df=pd.concat(dataframe, axis=0)

    if len(df) > 0:
        df.sort_values("timestamp", inplace=True)
        response = df.to_dict(orient="records")
        
    return response

if __name__ == "__main__":
    print("kek")
    print(read_log_files("var/log", "csv", 3600))