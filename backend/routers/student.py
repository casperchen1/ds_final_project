from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, text
from database import get_db
from models.Accouunt import StudentAccount
from models.Course import CourseInformation, CourseRecord
from models.Department import Department, GraduationRequirements, RequirementRule, RequirementCourseMapping

router = APIRouter(
    prefix="/student",
    tags=["StudentInformation"]
)

@router.get("/credits")
async def get_credits(student_id: str, db: AsyncSession = Depends(get_db)):
    """回傳總學分, 應修習學分"""
    pass

@router.get("/general_courses")
async def get_general_courses(student_id: str, db: AsyncSession = Depends(get_db)):
    """回傳通識課修課明細"""
    pass

@router.get("/pe")
async def get_pe(student_id: str, db: AsyncSession = Depends(get_db)):
    """回傳體育通過門數, 修課明細"""    
    pass

@router.get("/required_courses")
async def get_required_courses(student_id: str, db: AsyncSession = Depends(get_db)):
    """回傳必修課修課明細、必修課尚未修課明細、未滿足的子規則與缺少情況、必修科目分數要求"""
    pass

@router.get("/elective_courses")
async def get_elective_courses(student_id: str, db: AsyncSession = Depends(get_db)):
    """回傳選修課修課明細"""
    pass