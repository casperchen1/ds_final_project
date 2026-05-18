from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, text
from database import get_db
from models.Accouunt import StudentAccount, TeacherAccount

router = APIRouter(
    prefix="/account",
    tags=["Account"]
)

@router.get("/verify")
async def account_verify(student_id: str, password: str, db: AsyncSession = Depends(get_db)):
    """驗證是否登入成功並回傳身份"""
    pass
