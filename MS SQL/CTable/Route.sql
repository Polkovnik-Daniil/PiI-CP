--Нет необходимости в создании данной таблицы

CREATE TABLE Route
(
  id_route [nvarchar](40) NOT NULL,
  departure_point [nvarchar](40) NOT NULL,
  departure_airport [nvarchar](40) NOT NULL,
  point_of_arrival [nvarchar](40) NOT NULL,
  arrival_airport [nvarchar](40) NOT NULL,
  id_airplane [nvarchar](40)  NOT NULL,
  CONSTRAINT id_route_pk PRIMARY KEY (id_route),
  CONSTRAINT fk_id_airplane
      FOREIGN KEY (id_airplane)
      REFERENCES Airplanes(id_airplane)
);
DROP TABLE Route;