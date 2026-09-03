from enum import Enum


class EmploymentType(str, Enum):
    FULL_TIME = "Full_Time"
    PART_TIME = "Part_Time"
    CONTRACT = "Contract"
    INTERNSHIP = "Internship"
    FREELANCE = "Freelance"