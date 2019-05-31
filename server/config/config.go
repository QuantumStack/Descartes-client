package config

import (
	"fmt"

	"github.com/spf13/viper"
)

// Init reads the configuration file in the current directory and prepares it to
// be used by viper. 
// Panics if there is an issue reading the configuration file, cause we kind of
// need the configuration file...
func Init() {
	viper.SetConfigName("config")
	viper.AddConfigPath("./config")

	if err := viper.ReadInConfig(); err != nil {
		panic(fmt.Errorf("Fatal error reading configuration file: '%s'", err))
	}
}