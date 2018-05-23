#include <Arduino.h>
#include <Wire.h>
#include <SoftwareSerial.h>

#include <MeMCore.h>

MeDCMotor motor_9(9);
MeDCMotor motor_10(10);		

void move(int direction, int speed)
{
      int leftSpeed = 0;
      int rightSpeed = 0;
      if(direction == 1){
        	leftSpeed = speed;
        	rightSpeed = speed;
      }else if(direction == 2){
        	leftSpeed = -speed;
        	rightSpeed = -speed;
      }else if(direction == 3){
        	leftSpeed = -speed;
        	rightSpeed = speed;
      }else if(direction == 4){
        	leftSpeed = speed;
        	rightSpeed = -speed;
      }
      motor_9.run((9)==M1?-(leftSpeed):(leftSpeed));
      motor_10.run((10)==M1?-(rightSpeed):(rightSpeed));
}
				
double angle_rad = PI/180.0;
double angle_deg = 180.0/PI;
void __func__30452_35282_36681_28771();
double __var__36681_21521_27491_30906;
double __var__36681_21205_27425_25976;
double __var__36681_21205_19978_38480;
MeLineFollower linefollower_2(2);


void __func__30452_35282_36681_28771()
{
    __var__36681_21521_27491_30906 = 0;
    
    __var__36681_21205_27425_25976 = 0;
    
    __var__36681_21205_19978_38480 = 10000;
    
    move(3,100);
    
    while(!(((__var__36681_21521_27491_30906)==(1))))
    {
        _loop();
        __var__36681_21205_27425_25976 += 1;
        if((((linefollower_2.readSensors())==(0))) || (((linefollower_2.readSensors())==(1)))){
            __var__36681_21521_27491_30906 = 1;
        }else{
            if((__var__36681_21205_27425_25976) > (__var__36681_21205_19978_38480)){
                move(4,100);
                while(!((((linefollower_2.readSensors())==(0))) || (((linefollower_2.readSensors())==(2)))))
                {
                    _loop();
                }
                __var__36681_21521_27491_30906 = 1;
            }
        }
    }
    
}


void setup(){
    
}

void loop(){
    
    if(((linefollower_2.readSensors())==(0))){
        move(1,100);
    }
    if(((linefollower_2.readSensors())==(1))){
        while(!(((linefollower_2.readSensors())==(0))))
        {
            _loop();
            move(3,100);
        }
    }
    if(((linefollower_2.readSensors())==(2))){
        while(!(((linefollower_2.readSensors())==(0))))
        {
            _loop();
            move(4,100);
        }
    }
    if(((linefollower_2.readSensors())==(3))){
        move(2,100);
        __func__30452_3528 2_36681_28771();
    }
    
    _loop();
}

void _delay(float seconds){
    long endTime = millis() + seconds * 1000;
    while(millis() < endTime)_loop();
}

void _loop(){
    
}

