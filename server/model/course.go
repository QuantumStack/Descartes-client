package model

import (
	"github.com/jinzhu/gorm"
)

type Course struct {
	gorm.Model
	Name        string `gorm:"NOT NULL"`
	Instructors []User `gorm:"many2many:instructor_courses`
	Students    []User `gorm:"many2many:student_courses`
}
