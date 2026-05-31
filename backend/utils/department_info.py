from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from typing import Optional
from utils.exceptions import APIFailException
from utils.jsend_schemas import JSendSuccessResponse
from models.Department import Department

async def get_department_name(departmend_id: str, db:AsyncSession):
    result = await db.execute(select(Department.department_name).where(Department.department_name == departmend_id))
    return result.scalar()