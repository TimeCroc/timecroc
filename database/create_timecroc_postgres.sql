SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE TABLE public.employee (
	"_id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	"pin" VARCHAR ( 255 ) UNIQUE NOT NULL,
	"first_name" VARCHAR ( 255 ) NOT NULL,
	"last_name" VARCHAR ( 255 ) NOT NULL,
	"phone" VARCHAR ( 255 ) NOT NULL,
	"email" VARCHAR ( 255 ) NOT NULL,
	"hourly_rate" int 
) WITH (
  OIDS=FALSE
);


CREATE TABLE public.shift (
	"_id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	"employee_id" bigint NOT NULL,
	"shift_date" DATE NOT NULL,
	"start_time" bigint NOT NULL,
	"end_time" bigint,
	"tips" int,
	"reimbursements" int,
	"tours" int,
	"doc" int
) WITH (
  OIDS=FALSE
);


CREATE TABLE public.admin (
	"_id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	"email" VARCHAR ( 255 ) UNIQUE NOT NULL,
	"admin_password" VARCHAR ( 255 ) NOT NULL,
	"first_name" VARCHAR ( 255 ) NOT NULL,
	"last_name" VARCHAR ( 255 ) NOT NULL
) WITH (
	OIDS=FALSE
);

-- // Table for all shifts
-- // fields: _id, pay_period, employee_id, employee_name, total_hours, total_tips, total_reimbursements, total_tours, total_doc

-- on shift logout, check in the payperiods table for:
-- for the current payperiod, if a current employee is already exists in the table
-- 	if so, update the fields for that employee's total_hours, total_tips, etc
-- 	if not, create a new row with the current employee's info

	-- other important piece is Timesheet.js
		-- this is where the variables are that we need for total_hours, total_tips, etc

CREATE TABLE public.payperiods (
	"_id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	"pay_period" VARCHAR ( 255 ) NOT NULL,
	"employee_id" bigint NOT NULL,
	"first_name" VARCHAR ( 255 ) NOT NULL,
	"last_name" VARCHAR ( 255 ) NOT NULL,
	"total_hours" int,
	"total_minutes" int,
	"total_tips" int,
	"total_reimbursements" int,
	"total_tours" int,
	"total_doc" int
) WITH (
	OIDS=FALSE
);

ALTER TABLE public.payperiods ADD CONSTRAINT "payperiods_fk0" FOREIGN KEY ("employee_id") REFERENCES  public.employee("_id");



ALTER TABLE public.shift ADD CONSTRAINT "shift_fk0" FOREIGN KEY ("employee_id") REFERENCES  public.employee("_id");


INSERT INTO public.employee (
	 pin, first_name, last_name, phone, email, hourly_rate
) VALUES
(8413, 'Mark', 'Yencheske', 14144038413, 'markyencheske@gmail.com', 0),
(3099, 'Josh', 'Haertel', 14148033099, 'jrhaertel56@gmail.com', 0),
(1663, 'Scott', 'Smith', 14147791663, 'scottlsmith@wi.rr.com', 0),
(6416, 'Josh', 'Hornung', 14143056416, 'jdhorn88@yahoo.com', 0),
(8888, 'Ryan', 'Hiscox', 16086698888, 'rghiscox@uwalumni.com', 0);

INSERT INTO public.admin (
	email, admin_password, first_name, last_name
) VALUES
	('markyencheske@gmail.com', 'password', 'Mark', 'Yencheske'),
	('bestplacekaren@gmail.com', 'pbrmeasap', 'Karen', 'Haertel');

-- (2, 2, date, "starttime", "endtime", "tips", "reimbursments", "tours", "doc");
-- INSERT INTO public.shift (
-- 	shift_date, start_time, end_time, tips, reimbursements, tours, doc
-- ) VALUES
-- 	('2022-21-12', "08:00:00", "16:00:00", 10, 0, 0, 50),
-- 	('2022-20-12', "08:00:00", "16:00:00", 10, 0, 0, 50),
-- 	('2022-19-12', "08:00:00", "16:00:00", 10, 0, 0, 50),
-- 	('2022-18-12', "08:00:00", "16:00:00", 10, 0, 0, 50),
-- 	('2022-21-12', "10:00:00", "19:00:00", 0, 0, 1, 0),
-- 	('2022-20-12', "10:00:00", "19:00:00", 0, 0, 2, 0),
-- 	('2022-19-12', "10:00:00", "19:00:00", 0, 0, 2, 0),
-- 	('2022-18-12', "10:00:00", "19:00:00", 0, 0, 1, 0)
-- 	WHERE ;