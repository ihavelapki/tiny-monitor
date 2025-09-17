from fastapi import APIRouter
import pandas as pd

router = APIRouter()

@router.get("/metrics")
def get_metrics():
    df = pd.read_csv("../var/log/2025-08-12_host_tinymonitor.csv", delimiter="|")
    print(df.info())
    df['timestamp'] = (df['DATE'] + ' ' + df['TIME']).astype('datetime64[ns]')
    df["timestamp"] = pd.to_datetime(df["timestamp"])
    df.sort_values("timestamp", inplace=True)

    return df[["timestamp", "%CPU", "%MEM", "PID"]].to_dict(orient="records")