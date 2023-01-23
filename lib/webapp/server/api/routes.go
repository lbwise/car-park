package api

import (
	"io"
	"github.com/gin-gonic/gin"
)

func homeRoute(c *gin.Context) {
	io.WriteString(c.Writer, "THIS IS HOME")
}


func APIRouter(app *gin.Engine)  {
	api := app.Group("/")
	addUserRoutes(api)
	addBookingRoutes(api)
	api.GET("/", homeRoute)
	// addLotRoutes(api)
	// addBookRoutes(api)
}