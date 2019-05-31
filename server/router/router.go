package router

import (
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"github.com/labstack/gommon/log"
)

// New creates a new echo router that handles the
func New() *echo.Echo {
	// Create instance
	e := echo.New()

	// Debugging logs.
	e.Logger.SetLevel(log.DEBUG)

	// Configuration
	e.Pre(middleware.RemoveTrailingSlash())
	e.Use(middleware.Logger())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType,
			echo.HeaderAccept, echo.HeaderAuthorization},
		AllowMethods: []string{echo.GET, echo.HEAD, echo.PUT, echo.PATCH, echo.POST,
			echo.DELETE},
	}))

	// Return the echo instance
	return e
}
