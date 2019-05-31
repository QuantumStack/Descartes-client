package model

import (
	"github.com/jinzhu/gorm"
)

type User struct {
	gorm.Model
	Email    string `gorm:"UNIQUE_INDEX;NOT NULL"`
	Password string `gorm:"NOT NULL"`
}
