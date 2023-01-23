package api

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"time"
)

type Booking struct {
	lotId int
	date time.Time
}

func postBooking(c *gin.Context) {
	panic("HELP")
}

func updateBooking(c *gin.Context) {
	id := c.Param("id")
	fmt.Println(id)
}


func addBookingRoutes(api *gin.RouterGroup) {
	router := api.Group("/bookings")
	router.POST("/", postBooking)
	router.PUT("/:id", updateBooking)
}