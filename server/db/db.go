package db

import (
	"fmt"

	"github.com/QuantumStack/Descartes/server/model"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"github.com/spf13/viper"
)

func New() *gorm.DB {

	// Construct connection string
	connectString := fmt.Sprintf("host=%s port=%s user=%s dbname=%s password=%s",
		viper.Get("DB_HOST"), viper.Get("DB_PORT"), viper.Get("DB_USERNAME"),
		viper.Get("DB_NAME"), viper.Get("DB_PASSWORD"))

	// Disable SSL for development
	if viper.Get("GO_ENV") == "dev" {
		connectString += " sslmode=disable"
	}
	// Try connecting to database
	db, err := gorm.Open("postgres", connectString)

	// If there is an error, panic and quit. We need a database.
	if err != nil {
		panic(fmt.Errorf("Failed to connect to database: '%s'", err))
	}

	return db
}

func AutoMigrate(db *gorm.DB) {
	db.AutoMigrate(
		&model.User{},
		&model.Course{},
	)
}
