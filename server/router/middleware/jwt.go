package middleware

import (
	"net/http"

	"github.com/labstack/echo"
)

type (
	JWTConfig struct {
		Skipper    Skipper
		SigningKey interface{}
	}
	Skipper      func(c echo.Context) bool
	jwtExtractor func(echo.Context) (string, error)
)

var (
	// ErrJWTMissing is an HTTP Error dictating that a JWT is either nonexistent
	// or not well-formed.
	ErrJWTMissing = echo.NewHTTPError(http.StatusUnauthorized,
		"Missing or malformed JWT")

	// ErrJWTInvalid is an HTTP error where the JWT is invalid or expired.
	ErrJWTInvalid = echo.NewHTTPError(http.StatusForbidden,
		"Invalid or expired JWT")
)

func JWT(key interface{}) echo.MiddlewareFunc {
	c := JWTConfig{}
	c.SigningKey = key
	return JWTWithConfig(c)
}

func JWTWithConfig(config JWTConfig) echo.MiddlewareFunc {
	extractor := jwtFromHeader("Authorization", "Token")
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			auth, err := extractor(c)
			if err != nil {
				if config.Skipper != nil {
					if config.Skipper(c) {
						return next(c)
					}
				}
				return c.JSON(http.StatusUnauthorized, echo.NewHTTPError(http.))
			}
		}
	}
}
