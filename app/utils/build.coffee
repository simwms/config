class Build
  @about = "Some static classes for tile, point, and line construction DSL"

class Build.Road
  @from = ({snapGridX, snapGridY}) ->
    roadCore =
      x: snapGridX
      y: snapGridY
      points: [{x: 0, y: 0}]
      lineType: "road"
    to: ({snapGridX, snapGridY}) ->
      roadCore.points.pushObject 
        x: snapGridX - roadCore.x
        y: snapGridY - roadCore.y
      roadCore

class Build.Wall
  @from = ({snapGridX, snapGridY}) ->
    wallCore =
      x: snapGridX
      y: snapGridY
      points: [{x: 0, y: 0}]
      lineType: "wall"
    to: ({snapGridX, snapGridY}) ->
      wallCore.points.pushObject 
        x: snapGridX - wallCore.x
        y: snapGridY - wallCore.y
      wallCore

class Build.Dock
  @at = ({snapGridX, snapGridY}) ->
    x: snapGridX
    y: snapGridY
    tileType: "dock"

class Build.Entrance
  @at = ({snapGridX, snapGridY}) ->
    x: snapGridX
    y: snapGridY
    tileType: "entrance"

class Build.Exit
  @at = ({snapGridX, snapGridY}) ->
    x: snapGridX
    y: snapGridY
    tileType: "exit"

class Build.Cell
  @at = ({snapGridX, snapGridY}) ->
    x: snapGridX
    y: snapGridY
    tileType: "cell"

class Build.Scale
  @at = ({snapGridX, snapGridY}) ->
    x: snapGridX
    y: snapGridY
    tileType: "scale"

class Build.Desk
  @at = ({snapGridX, snapGridY}) ->
    x: snapGridX
    y: snapGridY
    tileType: "desk"

`export default Build`
