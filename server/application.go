package main

import (
	"net/http"

	"github.com/QuantumStack/Descartes/server/config"
	"github.com/QuantumStack/Descartes/server/db"
	"github.com/QuantumStack/Descartes/server/router"
	"github.com/labstack/echo"
)

func main() {
	// Initialize configuration.
	config.Init()

	// Create an instance
	r := router.New()
	// v1 := r.Group("/api")

	// Initialize Database
	d := db.New()
	db.AutoMigrate(d)

	r.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})
	r.Logger.Fatal(r.Start(":1323"))
}
