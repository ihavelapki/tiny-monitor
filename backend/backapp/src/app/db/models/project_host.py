from datetime import datetime

from sqlalchemy import (
    DateTime,
    ForeignKey,
    String,
    UniqueConstraint,
    func,
)
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class ProjectHost(Base):
    __tablename__ = "project_hosts"
    __table_args__ = (
        UniqueConstraint(
            "project_id",
            "host_id",
            "env",
            name="uq_project_hosts_project_host_env",
        ),
        {"schema": "ref"},
    )

    id: Mapped[int] = mapped_column(primary_key=True)

    project_id: Mapped[int] = mapped_column(
        ForeignKey("ref.projects.id", ondelete="CASCADE"),
        index=True,
    )
    host_id: Mapped[int] = mapped_column(
        ForeignKey("ref.hosts.id", ondelete="CASCADE"),
        index=True,
    )

    env: Mapped[str] = mapped_column(String(64), index=True)
    role: Mapped[str | None] = mapped_column(String(64), nullable=True)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )