
import oscP5.*;
import netP5.*;
OscP5 oscP5;
NetAddress address;

int numBeings = 2;
int numPlaces = 31;
float fieldStrength = 550;
Being[] beings = new Being[numBeings];
Place[] places = new Place[numPlaces]; 
Mouse user = new Mouse();

void setup() {
  oscP5 = new OscP5(this, 7474);
  address = new NetAddress("127.0.0.1", 7474);
  frameRate(180);
  size(1000, 1000);
  //fieldStrength = width * 0.55;
  background(0, 5);
  fill(255);
  for (int i = 0; i < numBeings; i++) {
    beings[i] = new Being();
  }
  for (int i = 0; i < numPlaces; i++) {
    places[i] = new Place();

    //ordered left - right, top - bottom
    //places[i].position.x = (width/numPlaces * i) + (width/numPlaces /2);
    //places[i].position.y = (height/numPlaces * i) + (height/numPlaces /2);

    //ordered in a circle
    places[i].position.x = (width/2-200) * sin(TWO_PI/numPlaces * i) + (width/2);
    //places[i].position.y = (width/2-200) * cos(TWO_PI/numPlaces * i) + (height/2);

    //random position
    //places[i].position.x = random(0, width);
    places[i].position.y = random(0, height);
  }
}




void draw() {
  fill(0, 10);
  rect(0, 0, width, height);
  noStroke();
  for (int i = 0; i < numPlaces; i++) {
    stroke(random(0, 60));
    places[i].drawField();
  }
  for (int i = 0; i < numPlaces; i++) {
    strokeWeight(5);
    stroke(160);
    places[i].placeText = i;
    places[i].drawPlace();
  }

  fill(255);
  beings[0].accelScale = 3000; //3000, 999 //2000, 985 - good combos
  beings[0].velScale = 0.999;
  beings[1].radius = 30;
  beings[0].beingColor = color(random(240, 255), random(200, 255), random(220, 255));
  beings[1].beingColor = color(random(240, 255), random(50, 100), random(50, 100));
  beings[1].accelScale = 3000; 
  beings[1].velScale = 0.999;
  if (mousePressed) {
    PVector mousePos = new PVector(mouseX, mouseY);
    user.positionU = mousePos;
    if (mouseButton == LEFT) {
      user.fieldColor = color(255, 255, 255, 30);
      user.drawField();
      beings[0].attractionToUser(mousePos);
      println("left");
      if (keyPressed && keyCode == SHIFT) {
        beings[0].velocity.x = 0;
        beings[0].velocity.y = 0;
        beings[0].position.x = mouseX;
        beings[0].position.y = mouseY;
      }
    }
    /*if (mouseButton == RIGHT) {
      user.fieldColor = color(255, 150, 150, 30);     
      user.drawField();
      beings[1].attractionToUser(mousePos);
      println("right");
      if (keyPressed && keyCode == SHIFT) {
        beings[1].velocity.x = 0;
        beings[1].velocity.y = 0;
        beings[1].position.x = mouseX;
        beings[1].position.y = mouseY;
      }
    }*/
    if (mouseButton == RIGHT) {
      int xPos = mouseX;
      int yPos = mouseY;
      
      float mod = (mouseX - width/4) + ((height-mouseY) - height/4); 
      fieldStrength = mod;
      
      println("cen");
    }
  }
  for (int i = 0; i < numBeings; i++) {
    //beings[i].attractionToBeing();   
    for (int j = 0; j < numPlaces; j++) {   
      if(keyPressed && key == 32) {
        beings[i].attraction(places[j].position);
        beings[i].velocity.x = 0;
        beings[i].velocity.y = 0;
      } else {
        beings[i].attraction(places[j].position);
      }
      beings[1].inPlace(j, places[j].position);
    } 
    beings[0].toPlaces();
    stroke(5);
    beings[i].go();
  }
    textSize(16);
    fill(130, 130, 170);
    text("Left Mouse Button: Attract white entity", 30, height - 95, 100);   
    text("Shift + Left Mouse Button: Drag and position white being", 30, height - 70, 100);
    text("Right Mouse Button: Drag to change planets' field size", 30, height - 45, 100);   
    text("Space: freeze entities", 30, height - 20, 100);
    
}

class Being {
  Being() {
  }  
  PVector position = new PVector(random(0, width), random(0, height));
  PVector velocity = new PVector(random(0, 4), random(0, 4));
  PVector accel = new PVector(0, 0);
  float radius = random(15, 20);
  color beingColor = color(random(200, 255), random(150, 255), random(100, 255));

  float accelScale = 0;
  float velScale = 0;

  void go() {
    display();
    run();
    bounce();
  }

  void display() {
    fill(beingColor);
    ellipse (position.x, position.y, radius, radius);
  }

  void run() { 
    //velocity.x = 0.01;
    //velocity.y = 0.01;
    position.x += velocity.x/1;
    position.y += velocity.y/1;
  }

  void bounce() {
    if ((position.x > width) || (position.x < 0)) {
      velocity.x = velocity.x * -1;
      position.x -= position.x % width;
    }
    if ((position.y > height) || (position.y < 0)) {
      velocity.y = velocity.y * -1;
      position.y -= position.y % height;
    }
  } 

  void attraction(PVector placePos) {
    PVector toPlace = PVector.sub(placePos, position);
    float magnitude = toPlace.mag() * 10;
    accel.x = (cos(toPlace.heading())) / pow(magnitude, 2);
    accel.y = (sin(toPlace.heading())) / pow(magnitude, 2);
    accel.mult(accelScale);
    velocity.x += accel.x;
    velocity.y += accel.y;
    velocity.mult(velScale);
    position.x += velocity.x;
    position.y += velocity.y;
  }

  void attractionToUser(PVector userPos) {   
    PVector toPlace = PVector.sub(userPos, position);
    float magnitude = toPlace.mag() * 2;
    accel.x = (cos(toPlace.heading())) / pow(magnitude, 2);
    accel.y = (sin(toPlace.heading())) / pow(magnitude, 2);
    accel.mult(accelScale);
    velocity.x += accel.x;
    velocity.y += accel.y;
    velocity.mult(1);
    position.x += velocity.x;
    position.y += velocity.y;
  }

  void toPlaces() {
    PVector distancesToPlaces = new PVector();
    OscMessage m_distancesToPlaces = new OscMessage("/distances");
    for (int i = 0; i < numPlaces; i++) {  
      distancesToPlaces = PVector.sub(position, places[i].position);
      if (distancesToPlaces.mag() <= (fieldStrength/2)) {    
        m_distancesToPlaces.add( (fieldStrength/2 - distancesToPlaces.mag())/(fieldStrength/2));
        places[i].fieldColor += (distancesToPlaces.mag()/(fieldStrength/2)) * 255;
      } else {
        m_distancesToPlaces.add(0.0);
        places[i].fieldColor = places[i].placeColor - 50;
      }
    }
    oscP5.send(m_distancesToPlaces, address);
  }

  void inPlace(int placeIndex, PVector placePos) {
    PVector toPlace = PVector.sub(position, placePos);
    float magnitude = toPlace.mag();
    if (magnitude < 15) {
      OscMessage inPlace = new OscMessage("/inplace");
      inPlace.add(placeIndex);
      oscP5.send(inPlace, address);
      places[placeIndex].placeColor = color(random(80, 200), random(80, 200), random(80, 200));
      places[placeIndex].fieldColor = places[placeIndex].placeColor - 30;
    }
  }
}


class Place {
  PVector position = new PVector(random(0, width), random(0, height));
  float size = 30;
  color placeColor = color(random(50, 80), random(50, 120), random(50, 120));
  color fieldColor = placeColor - 50;
  int placeText = 0;
  void drawField() {
    strokeWeight(0);
    //noStroke();
    fill(fieldColor, 5);
    ellipse(position.x, position.y, size + fieldStrength, size + fieldStrength);
  }
  void drawPlace() {
    strokeWeight(1);
    fill(placeColor);
    ellipse(position.x, position.y, size, size);
    textSize(12);
    fill(100, 100, 135);
    text(placeText, position.x - size/2/2, position.y + size/2/2/2); 
    fill(135, 135, 170);
  }
}

class Mouse {
  PVector positionU = new PVector(random(0, width), random(0, height));
  color fieldColor = color(255, 255, 255, 30);
  int fieldSize = 50;
  void drawField() {
    strokeWeight(0);
    //noStroke();
    fill(fieldColor);
    ellipse(positionU.x, positionU.y, fieldSize, fieldSize);
  }
}