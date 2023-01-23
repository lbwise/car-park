package main

import (
	"context"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
	"github.com/gin-gonic/gin"
	"webapp/server/logs"
	"webapp/server/api"
)


func main() {
	lg := logs.NewLogger()
	lg.Log("CAR-PARK SERVER")
	app := gin.New()
	server := http.Server{ 
		Addr: ":9000",
		Handler: app,
	}

	app.Use(lg.LogMiddleware)
	api.APIRouter(app)


	go func () {
		err := app.Run(":9000")
		if err != nil {
			lg.Fatal(err)
			os.Exit(1)
		}
	}()

	sigs := make(chan os.Signal, 1)
	signal.Notify(sigs, syscall.SIGTERM, syscall.SIGINT, os.Interrupt)
	<- sigs
	ctx, cancel := context.WithTimeout(context.Background(), 5 * time.Second)
	defer cancel()
	lg.Log("SHUTTING DOWN")
	server.Shutdown(ctx)
}