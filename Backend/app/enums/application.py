from enum import Enum

class ApplicationStatus(str, Enum):
    pending = "pending"
    reviewed = "reviewed"
    shortlisted = "shortlisted"
    rejected = "rejected"
    hired = "hired"
    withdrawn = "withdrawn"