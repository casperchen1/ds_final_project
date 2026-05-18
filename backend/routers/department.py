from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, text
from database import get_db
from models.Course import CourseRecord
from models.Department import Department, GraduationRequirements, RequirementRule, RequirementCourseMapping