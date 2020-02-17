--
-- PostgreSQL database dump
--

-- Dumped from database version 11.6 (Ubuntu 11.6-1.pgdg16.04+1)
-- Dumped by pg_dump version 12.1

-- Started on 2020-02-17 16:06:46

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

--
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 3899 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

--
-- TOC entry 204 (class 1259 OID 7428699)
-- Name: application; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.application (
    application_id bigint NOT NULL,
    person_id bigint,
    time_of_submission timestamp without time zone,
    status integer NOT NULL,
    last_edited timestamp without time zone
);


ALTER TABLE public.application OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 7428695)
-- Name: application_application_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.application ALTER COLUMN application_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.application_application_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 198 (class 1259 OID 7300584)
-- Name: availability; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.availability (
    availability_id bigint NOT NULL,
    person_id bigint,
    from_date date,
    to_date date
);


ALTER TABLE public.availability OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 7870169)
-- Name: availability_availability_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.availability ALTER COLUMN availability_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.availability_availability_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999999999
    CACHE 1
);


--
-- TOC entry 199 (class 1259 OID 7300594)
-- Name: competence; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.competence (
    competence_id bigint NOT NULL,
    name character varying(255)
);


ALTER TABLE public.competence OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 8024427)
-- Name: competence_language; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.competence_language (
    competence_id bigint NOT NULL,
    name character varying,
    language character varying NOT NULL
);


ALTER TABLE public.competence_language OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 7300599)
-- Name: competence_profile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.competence_profile (
    competence_profile_id bigint NOT NULL,
    person_id bigint,
    competence_id bigint,
    years_of_experience numeric(4,2)
);


ALTER TABLE public.competence_profile OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 7424449)
-- Name: competence_profile_competence_profile_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.competence_profile ALTER COLUMN competence_profile_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.competence_profile_competence_profile_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 197 (class 1259 OID 7300571)
-- Name: person; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.person (
    person_id bigint NOT NULL,
    name character varying(255),
    surname character varying(255),
    ssn character varying(255),
    email character varying(255),
    password character varying(255),
    role_id bigint,
    username character varying(255),
    token character varying
);


ALTER TABLE public.person OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 7395312)
-- Name: person_person_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.person ALTER COLUMN person_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.person_person_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 196 (class 1259 OID 7300566)
-- Name: role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role (
    role_id bigint NOT NULL,
    name character varying(255)
);


ALTER TABLE public.role OWNER TO postgres;

--
-- TOC entry 3891 (class 0 OID 7428699)
-- Dependencies: 204
-- Data for Name: application; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.application (application_id, person_id, time_of_submission, status, last_edited) OVERRIDING SYSTEM VALUE VALUES (42, 125, '2020-02-17 00:00:00', 0, NULL);
INSERT INTO public.application (application_id, person_id, time_of_submission, status, last_edited) OVERRIDING SYSTEM VALUE VALUES (59, 126, '2020-02-17 00:00:00', 0, NULL);
INSERT INTO public.application (application_id, person_id, time_of_submission, status, last_edited) OVERRIDING SYSTEM VALUE VALUES (63, 127, '2020-02-17 00:00:00', 0, NULL);
INSERT INTO public.application (application_id, person_id, time_of_submission, status, last_edited) OVERRIDING SYSTEM VALUE VALUES (64, 129, '2020-02-17 00:00:00', 0, NULL);
INSERT INTO public.application (application_id, person_id, time_of_submission, status, last_edited) OVERRIDING SYSTEM VALUE VALUES (9, 0, '2020-01-30 00:00:00', 2, NULL);
INSERT INTO public.application (application_id, person_id, time_of_submission, status, last_edited) OVERRIDING SYSTEM VALUE VALUES (65, 130, '2020-02-17 00:00:00', 0, NULL);
INSERT INTO public.application (application_id, person_id, time_of_submission, status, last_edited) OVERRIDING SYSTEM VALUE VALUES (73, 137, '2020-02-17 00:00:00', 0, NULL);
INSERT INTO public.application (application_id, person_id, time_of_submission, status, last_edited) OVERRIDING SYSTEM VALUE VALUES (30, 74, '2020-01-30 00:00:00', 0, NULL);
INSERT INTO public.application (application_id, person_id, time_of_submission, status, last_edited) OVERRIDING SYSTEM VALUE VALUES (33, 76, '2020-02-06 00:00:00', 0, NULL);
INSERT INTO public.application (application_id, person_id, time_of_submission, status, last_edited) OVERRIDING SYSTEM VALUE VALUES (10, 24, '2020-01-30 00:00:00', 2, NULL);
INSERT INTO public.application (application_id, person_id, time_of_submission, status, last_edited) OVERRIDING SYSTEM VALUE VALUES (34, 77, '2020-02-07 00:00:00', 2, NULL);
INSERT INTO public.application (application_id, person_id, time_of_submission, status, last_edited) OVERRIDING SYSTEM VALUE VALUES (35, 28, '2020-02-14 00:00:00', 0, NULL);
INSERT INTO public.application (application_id, person_id, time_of_submission, status, last_edited) OVERRIDING SYSTEM VALUE VALUES (40, 121, '2020-02-14 00:00:00', 0, NULL);
INSERT INTO public.application (application_id, person_id, time_of_submission, status, last_edited) OVERRIDING SYSTEM VALUE VALUES (2, 2, '2020-01-28 00:00:00', 1, '2020-02-14 14:50:58.944');


--
-- TOC entry 3885 (class 0 OID 7300584)
-- Dependencies: 198
-- Data for Name: availability; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.availability (availability_id, person_id, from_date, to_date) OVERRIDING SYSTEM VALUE VALUES (1, 2, '2014-02-23', '2014-05-25');
INSERT INTO public.availability (availability_id, person_id, from_date, to_date) OVERRIDING SYSTEM VALUE VALUES (2, 2, '2014-07-10', '2014-08-10');
INSERT INTO public.availability (availability_id, person_id, from_date, to_date) OVERRIDING SYSTEM VALUE VALUES (12, 0, '2020-01-31', '2020-02-17');
INSERT INTO public.availability (availability_id, person_id, from_date, to_date) OVERRIDING SYSTEM VALUE VALUES (13, 0, '2020-02-27', '2020-02-29');
INSERT INTO public.availability (availability_id, person_id, from_date, to_date) OVERRIDING SYSTEM VALUE VALUES (14, 24, '2020-01-31', '2020-02-03');
INSERT INTO public.availability (availability_id, person_id, from_date, to_date) OVERRIDING SYSTEM VALUE VALUES (15, 24, '2020-02-04', '2020-02-06');
INSERT INTO public.availability (availability_id, person_id, from_date, to_date) OVERRIDING SYSTEM VALUE VALUES (16, 24, '2020-02-17', '2020-02-20');
INSERT INTO public.availability (availability_id, person_id, from_date, to_date) OVERRIDING SYSTEM VALUE VALUES (18, 74, '2020-02-19', '2020-02-22');
INSERT INTO public.availability (availability_id, person_id, from_date, to_date) OVERRIDING SYSTEM VALUE VALUES (22, 76, '2020-02-19', '2020-03-17');
INSERT INTO public.availability (availability_id, person_id, from_date, to_date) OVERRIDING SYSTEM VALUE VALUES (23, 76, '2020-03-22', '2020-03-25');
INSERT INTO public.availability (availability_id, person_id, from_date, to_date) OVERRIDING SYSTEM VALUE VALUES (24, 76, '2020-02-10', '2020-02-14');
INSERT INTO public.availability (availability_id, person_id, from_date, to_date) OVERRIDING SYSTEM VALUE VALUES (25, 77, '2020-02-11', '2020-02-14');
INSERT INTO public.availability (availability_id, person_id, from_date, to_date) OVERRIDING SYSTEM VALUE VALUES (26, 77, '2020-02-24', '2020-02-28');
INSERT INTO public.availability (availability_id, person_id, from_date, to_date) OVERRIDING SYSTEM VALUE VALUES (31, 121, '2020-02-19', '2020-02-29');
INSERT INTO public.availability (availability_id, person_id, from_date, to_date) OVERRIDING SYSTEM VALUE VALUES (32, 121, '2020-02-26', '2020-03-31');
INSERT INTO public.availability (availability_id, person_id, from_date, to_date) OVERRIDING SYSTEM VALUE VALUES (36, 127, '2020-02-21', '2020-02-28');
INSERT INTO public.availability (availability_id, person_id, from_date, to_date) OVERRIDING SYSTEM VALUE VALUES (37, 129, '2020-02-20', '2020-02-27');
INSERT INTO public.availability (availability_id, person_id, from_date, to_date) OVERRIDING SYSTEM VALUE VALUES (38, 130, '2020-02-17', '2020-02-20');
INSERT INTO public.availability (availability_id, person_id, from_date, to_date) OVERRIDING SYSTEM VALUE VALUES (46, 137, '2020-02-20', '2020-02-22');


--
-- TOC entry 3886 (class 0 OID 7300594)
-- Dependencies: 199
-- Data for Name: competence; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.competence (competence_id, name) VALUES (1, 'Korvgrillning');
INSERT INTO public.competence (competence_id, name) VALUES (2, 'Karuselldrift');
INSERT INTO public.competence (competence_id, name) VALUES (3, 'Fårtämjning');
INSERT INTO public.competence (competence_id, name) VALUES (4, 'Clown');
INSERT INTO public.competence (competence_id, name) VALUES (5, 'Försäljning');


--
-- TOC entry 3893 (class 0 OID 8024427)
-- Dependencies: 206
-- Data for Name: competence_language; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.competence_language (competence_id, name, language) VALUES (1, 'Korvgrillning', 'sv-se');
INSERT INTO public.competence_language (competence_id, name, language) VALUES (2, 'Karuselldrift', 'sv-se');
INSERT INTO public.competence_language (competence_id, name, language) VALUES (3, 'Fårtämjning', 'sv-se');
INSERT INTO public.competence_language (competence_id, name, language) VALUES (4, 'Clown', 'sv-se');
INSERT INTO public.competence_language (competence_id, name, language) VALUES (5, 'Försäljning', 'sv-se');
INSERT INTO public.competence_language (competence_id, name, language) VALUES (1, 'Cooking sausages', 'en-us');
INSERT INTO public.competence_language (competence_id, name, language) VALUES (2, 'Carousel operation', 'en-us');
INSERT INTO public.competence_language (competence_id, name, language) VALUES (3, 'Sheep taming', 'en-us');
INSERT INTO public.competence_language (competence_id, name, language) VALUES (4, 'Clown', 'en-us');
INSERT INTO public.competence_language (competence_id, name, language) VALUES (5, 'Sales', 'en-us');


--
-- TOC entry 3887 (class 0 OID 7300599)
-- Dependencies: 200
-- Data for Name: competence_profile; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.competence_profile (competence_profile_id, person_id, competence_id, years_of_experience) OVERRIDING SYSTEM VALUE VALUES (1, 2, 1, 3.50);
INSERT INTO public.competence_profile (competence_profile_id, person_id, competence_id, years_of_experience) OVERRIDING SYSTEM VALUE VALUES (2, 2, 2, 2.00);
INSERT INTO public.competence_profile (competence_profile_id, person_id, competence_id, years_of_experience) OVERRIDING SYSTEM VALUE VALUES (21, 0, 4, 5.00);
INSERT INTO public.competence_profile (competence_profile_id, person_id, competence_id, years_of_experience) OVERRIDING SYSTEM VALUE VALUES (22, 0, 2, 4.00);
INSERT INTO public.competence_profile (competence_profile_id, person_id, competence_id, years_of_experience) OVERRIDING SYSTEM VALUE VALUES (23, 0, 5, 10.00);
INSERT INTO public.competence_profile (competence_profile_id, person_id, competence_id, years_of_experience) OVERRIDING SYSTEM VALUE VALUES (24, 24, 4, 4.00);
INSERT INTO public.competence_profile (competence_profile_id, person_id, competence_id, years_of_experience) OVERRIDING SYSTEM VALUE VALUES (25, 24, 2, 5.00);
INSERT INTO public.competence_profile (competence_profile_id, person_id, competence_id, years_of_experience) OVERRIDING SYSTEM VALUE VALUES (26, 24, 5, 2.00);
INSERT INTO public.competence_profile (competence_profile_id, person_id, competence_id, years_of_experience) OVERRIDING SYSTEM VALUE VALUES (27, 24, 5, 2.00);
INSERT INTO public.competence_profile (competence_profile_id, person_id, competence_id, years_of_experience) OVERRIDING SYSTEM VALUE VALUES (93, 75, NULL, NULL);
INSERT INTO public.competence_profile (competence_profile_id, person_id, competence_id, years_of_experience) OVERRIDING SYSTEM VALUE VALUES (94, 75, NULL, NULL);
INSERT INTO public.competence_profile (competence_profile_id, person_id, competence_id, years_of_experience) OVERRIDING SYSTEM VALUE VALUES (95, 75, NULL, NULL);
INSERT INTO public.competence_profile (competence_profile_id, person_id, competence_id, years_of_experience) OVERRIDING SYSTEM VALUE VALUES (96, 75, NULL, NULL);
INSERT INTO public.competence_profile (competence_profile_id, person_id, competence_id, years_of_experience) OVERRIDING SYSTEM VALUE VALUES (97, 75, NULL, NULL);
INSERT INTO public.competence_profile (competence_profile_id, person_id, competence_id, years_of_experience) OVERRIDING SYSTEM VALUE VALUES (33, 74, NULL, NULL);
INSERT INTO public.competence_profile (competence_profile_id, person_id, competence_id, years_of_experience) OVERRIDING SYSTEM VALUE VALUES (34, 74, NULL, NULL);
INSERT INTO public.competence_profile (competence_profile_id, person_id, competence_id, years_of_experience) OVERRIDING SYSTEM VALUE VALUES (35, 74, NULL, NULL);
INSERT INTO public.competence_profile (competence_profile_id, person_id, competence_id, years_of_experience) OVERRIDING SYSTEM VALUE VALUES (36, 74, NULL, NULL);
INSERT INTO public.competence_profile (competence_profile_id, person_id, competence_id, years_of_experience) OVERRIDING SYSTEM VALUE VALUES (37, 74, NULL, NULL);
INSERT INTO public.competence_profile (competence_profile_id, person_id, competence_id, years_of_experience) OVERRIDING SYSTEM VALUE VALUES (98, 74, NULL, NULL);
INSERT INTO public.competence_profile (competence_profile_id, person_id, competence_id, years_of_experience) OVERRIDING SYSTEM VALUE VALUES (99, 74, NULL, NULL);
INSERT INTO public.competence_profile (competence_profile_id, person_id, competence_id, years_of_experience) OVERRIDING SYSTEM VALUE VALUES (100, 74, NULL, NULL);
INSERT INTO public.competence_profile (competence_profile_id, person_id, competence_id, years_of_experience) OVERRIDING SYSTEM VALUE VALUES (101, 74, NULL, NULL);
INSERT INTO public.competence_profile (competence_profile_id, person_id, competence_id, years_of_experience) OVERRIDING SYSTEM VALUE VALUES (102, 74, NULL, NULL);
INSERT INTO public.competence_profile (competence_profile_id, person_id, competence_id, years_of_experience) OVERRIDING SYSTEM VALUE VALUES (119, 74, 2, 2.00);
INSERT INTO public.competence_profile (competence_profile_id, person_id, competence_id, years_of_experience) OVERRIDING SYSTEM VALUE VALUES (123, 76, 3, 4.00);
INSERT INTO public.competence_profile (competence_profile_id, person_id, competence_id, years_of_experience) OVERRIDING SYSTEM VALUE VALUES (124, 76, 2, 4.00);
INSERT INTO public.competence_profile (competence_profile_id, person_id, competence_id, years_of_experience) OVERRIDING SYSTEM VALUE VALUES (125, 76, 3, 3.00);
INSERT INTO public.competence_profile (competence_profile_id, person_id, competence_id, years_of_experience) OVERRIDING SYSTEM VALUE VALUES (126, 77, 2, 3.00);
INSERT INTO public.competence_profile (competence_profile_id, person_id, competence_id, years_of_experience) OVERRIDING SYSTEM VALUE VALUES (127, 77, 3, 3.00);
INSERT INTO public.competence_profile (competence_profile_id, person_id, competence_id, years_of_experience) OVERRIDING SYSTEM VALUE VALUES (128, 28, 4, 5.00);
INSERT INTO public.competence_profile (competence_profile_id, person_id, competence_id, years_of_experience) OVERRIDING SYSTEM VALUE VALUES (133, 121, 2, 4.00);
INSERT INTO public.competence_profile (competence_profile_id, person_id, competence_id, years_of_experience) OVERRIDING SYSTEM VALUE VALUES (134, 121, 2, 3.00);
INSERT INTO public.competence_profile (competence_profile_id, person_id, competence_id, years_of_experience) OVERRIDING SYSTEM VALUE VALUES (158, 127, 2, 5.00);
INSERT INTO public.competence_profile (competence_profile_id, person_id, competence_id, years_of_experience) OVERRIDING SYSTEM VALUE VALUES (173, 129, 2, 2.00);
INSERT INTO public.competence_profile (competence_profile_id, person_id, competence_id, years_of_experience) OVERRIDING SYSTEM VALUE VALUES (175, 130, 1, 1.00);
INSERT INTO public.competence_profile (competence_profile_id, person_id, competence_id, years_of_experience) OVERRIDING SYSTEM VALUE VALUES (183, 137, 1, 2.00);


--
-- TOC entry 3884 (class 0 OID 7300571)
-- Dependencies: 197
-- Data for Name: person; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (2, 'Per', 'Strand', '19671212-1211', 'per@strand.kth.se', NULL, 2, NULL, NULL);
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (130, 'd', 'd', '2020-02-05', 'd@d.com', 'donpebo', 2, 'donpebo3', NULL);
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (120, 'newuser', 'abc', '2020-02-13', 'newuser@newuse.com', 'newuser', 2, 'newuser', NULL);
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (28, 'fd', 'gh', '2020-01-16', '23@sd', '1234', 2, '1234', 'bfa3fb48cde7d688d311940b08239333f76adedf2114a215ef29e71eaa11b0e5115a684b0cfefca1436f31933e691b09e05c0337fd06b8a3e012142a20ea3446');
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (121, 'hejhejhej', 'hejhejhej', '0001-01-01', 'hejhejhej@hej.se', 'hejhejhej', 2, 'hejhejhej', 'c5ba67fc29c586abb5ec968c182f5f3cf179580e7e156d74797d2de2b370ecc36a20b54b1538f45cc3daeeda59a6ba8a4b5eddb95d64147faeeffe05ec791d98');
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (75, 'hej', 'hej', '0002-01-01', 'hej@hej.se', 'hejhejhej', 2, 'hej', NULL);
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (127, 'pebo', 'pebo', '2020-02-13', 'p@p.com', 'donpebo', 2, 'donpebo1', NULL);
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (74, 'test', 'testsson', '0001-01-01', 'test@test.se', 'testtest', 2, 'test', NULL);
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (137, 'd', 'd', '2020-02-13', 'd@d.com', 'donpebo', 2, 'donpebo5', 'ce071286dcbc374790ff73ee553b427035a48a22e8b57f09906dfcc8ff4d3874fd649932a310d234e68fefcb86538f3b6e1251e9cb5dda6f49192a5aefb9c7f0');
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (27, 'kfgsuijodhyui+´wesdklfjnm,cvhuidkfendiov', 'ockidfgjvhbfopkxnhi0rsjokbnwj+qoskåhbjpne0m9pdf,o', '2017-11-28', 'dfghkmdoghmdghnmdghmpod@kjbidbidin.se', 'ehmkriohkm,eiohkm,iodfhiopdfhm,', 2, 'ndhjoehjeorhjoiet', 'f67778aa266cea0e29b0dc26124ec4306c5379dbc625ba25fc9392a8b207008d928eead993ba9735d27421f5dc870a626e2b9d7523f1c06c4f1c72d82d058054');
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (90, 'donpebo', 'dd', '2020-02-07', 'd@d.com', 'dddddddd', 2, 'd', NULL);
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (93, 'donpebo', 'do', '2020-02-01', 'do@d.com', 'sssssss', 2, 's', NULL);
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (94, 'donpebo', 'd', '2020-02-06', 'pebo@pebo.com', 'sssssss', 2, 'ss', NULL);
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (126, 'a', 'a', '0001-01-01', 'a@a.se', 'aaaaaaa', 2, 'a', '4d8bbbd55c58890b943305ab38dd053f4cf0a4016cdb1fee80563235c84ffe99e272631b2d7cb5eb305c2824b53fe14ed3e0d25f5f9d325f0b9d9230a6e3adf1');
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (96, 'donpebo', 'd', '2020-02-07', 'd@d.com', 'ppppppp', 2, 'p', NULL);
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (79, 'ko', 'ja', '10-10-2000', 'hej@has.sa', 'dsdfesa', 2, 'hesdfsdj', NULL);
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (29, 'jakob', 'jakob', '1111-01-01', 'jakob', 'jakob', 2, 'Jakob', NULL);
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (69, 'a', 'a', '0001-01-01', 'a@a.ae', 'asdfghj', 2, 'asd', NULL);
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (70, NULL, NULL, NULL, NULL, NULL, 2, NULL, NULL);
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (71, 'asd', 'asd', '0001-01-01', 'asd@dfs.se', 'aaaaaaa', 2, 'sdasd', NULL);
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (26, 'Pebo', 'Hamza', '1998-03-28', 'kkkkk@hotmail.com', 'pebo', 2, 'pebo', NULL);
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (73, 'asd', 'asd', '0001-01-01', 'asd@dfs.se', 'aaaaaaa', 2, 'sdasdasd', NULL);
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (76, 'hejhej', 'hejhej', '0001-01-01', 'hejhej@hej.hej', 'hejhej1', 2, 'hejhej', '786dd5d5ede1aabe3f6b4d13e5a0944f793bc539ce3f9c8fd7a4fe3adedf390a8966598e4854d4628c3713661fecaf70a2fb00757f4741a42073c701146aa2e0');
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (1, 'Greta', 'Borg', NULL, NULL, 'wl9nk23a', 1, 'borg', NULL);
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (128, 'donpebo2', 'donpebo', '2020-02-13', 'd@d.ocm', 'donpebo', 2, 'donpebo2', NULL);
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (124, 'pe', 'p', '2020-02-07', 'don@don.com', 'ssssssss', 2, 'pebo2', NULL);
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (117, 'pebo', 'pebo', '2020-02-07', 'p@p.com', 'sssssss', 2, 'pebo1', NULL);
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (0, 'Jakob', 'Molin', '1997-07-04', 'abc@gmail.com', 'abc123', 2, 'raskpask', NULL);
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (24, '1', 'asd', '1231-12-01', 'as', 'jakob', 2, 'JakobMolin', 'a50892b68a940e2ea120b74dca85099e8bc0a861c4e7cf26cad91211af80140d5ce351fade8125cea45d61840a55371a13890ca5dfe6f6e31e040d552c90197b');
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (131, 'p', 'p', '2020-02-06', 'p@k.com', 'donpebo', 2, 'donpebo4', NULL);
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (88, 'donpebo', 'donpebo', '2020-02-01', 'don@pebo.com', 'donpebo', 2, 'donpebo', NULL);
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (125, 'pebo', 'pebo', '2020-02-13', 'pebo@pebo.pebo', 'pebo3pebo3', 2, 'pebo3', '8b3df51c2da6095ade944ac2de0228617c59a5698a9291dc8e7e2d302898a5ec79fc6b4c2e68accd374ab51987ec73ec3e4cc5de9b9e5e677901cd1e5e64cb1f');
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (129, 'b', 'b', '0001-01-01', 'b@b.se', 'bbbbbbb', 2, 'b', NULL);
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (87, 'fd', 'dfs', '2020-02-03', 'sdf@dfgdgf.sdf', 'HejHejHej', 2, 'Rikard', 'b27fc2458a7f88f51ea925bf8731c146b2d26719211cf801de8dd02f85d606f433d5aee4c85ec7dcd5f081f6d41edd365972369bb19cff3ff25c1de4295e04f5');
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (77, 'Jakob', 'Molin', '0123-01-01', 'jak@gmail.com', 'hello12', 2, 'hello', NULL);


--
-- TOC entry 3883 (class 0 OID 7300566)
-- Dependencies: 196
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.role (role_id, name) VALUES (1, 'recruit');
INSERT INTO public.role (role_id, name) VALUES (2, 'applicant');


--
-- TOC entry 3902 (class 0 OID 0)
-- Dependencies: 203
-- Name: application_application_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.application_application_id_seq', 74, true);


--
-- TOC entry 3903 (class 0 OID 0)
-- Dependencies: 205
-- Name: availability_availability_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.availability_availability_id_seq', 47, true);


--
-- TOC entry 3904 (class 0 OID 0)
-- Dependencies: 202
-- Name: competence_profile_competence_profile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.competence_profile_competence_profile_id_seq', 185, true);


--
-- TOC entry 3905 (class 0 OID 0)
-- Dependencies: 201
-- Name: person_person_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.person_person_id_seq', 137, true);


--
-- TOC entry 3751 (class 2606 OID 7428703)
-- Name: application App_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.application
    ADD CONSTRAINT "App_id" PRIMARY KEY (application_id);


--
-- TOC entry 3745 (class 2606 OID 7424871)
-- Name: competence Competence_name; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competence
    ADD CONSTRAINT "Competence_name" UNIQUE (name);


--
-- TOC entry 3737 (class 2606 OID 7396274)
-- Name: person Token; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT "Token" UNIQUE (token);


--
-- TOC entry 3739 (class 2606 OID 7396183)
-- Name: person Username; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT "Username" UNIQUE (username);


--
-- TOC entry 3743 (class 2606 OID 7300588)
-- Name: availability availability_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.availability
    ADD CONSTRAINT availability_pkey PRIMARY KEY (availability_id);


--
-- TOC entry 3755 (class 2606 OID 8024434)
-- Name: competence_language competence_language_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competence_language
    ADD CONSTRAINT competence_language_pkey PRIMARY KEY (language, competence_id);


--
-- TOC entry 3747 (class 2606 OID 7300598)
-- Name: competence competence_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competence
    ADD CONSTRAINT competence_pkey PRIMARY KEY (competence_id);


--
-- TOC entry 3749 (class 2606 OID 7300603)
-- Name: competence_profile competence_profile_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competence_profile
    ADD CONSTRAINT competence_profile_pkey PRIMARY KEY (competence_profile_id);


--
-- TOC entry 3741 (class 2606 OID 7300578)
-- Name: person person_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT person_pkey PRIMARY KEY (person_id);


--
-- TOC entry 3753 (class 2606 OID 7893590)
-- Name: application personal_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.application
    ADD CONSTRAINT personal_id UNIQUE (person_id);


--
-- TOC entry 3735 (class 2606 OID 7300570)
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (role_id);


--
-- TOC entry 3757 (class 2606 OID 7300589)
-- Name: availability availability_person_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.availability
    ADD CONSTRAINT availability_person_id_fkey FOREIGN KEY (person_id) REFERENCES public.person(person_id);


--
-- TOC entry 3761 (class 2606 OID 8024466)
-- Name: competence_language competence_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competence_language
    ADD CONSTRAINT competence_id_fkey FOREIGN KEY (competence_id) REFERENCES public.competence(competence_id) NOT VALID;


--
-- TOC entry 3759 (class 2606 OID 7300609)
-- Name: competence_profile competence_profile_competence_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competence_profile
    ADD CONSTRAINT competence_profile_competence_id_fkey FOREIGN KEY (competence_id) REFERENCES public.competence(competence_id);


--
-- TOC entry 3758 (class 2606 OID 7300604)
-- Name: competence_profile competence_profile_person_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competence_profile
    ADD CONSTRAINT competence_profile_person_id_fkey FOREIGN KEY (person_id) REFERENCES public.person(person_id);


--
-- TOC entry 3760 (class 2606 OID 7428704)
-- Name: application id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.application
    ADD CONSTRAINT id FOREIGN KEY (person_id) REFERENCES public.person(person_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3756 (class 2606 OID 7300579)
-- Name: person person_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT person_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.role(role_id);


--
-- TOC entry 3900 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- TOC entry 3901 (class 0 OID 0)
-- Dependencies: 627
-- Name: LANGUAGE plpgsql; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON LANGUAGE plpgsql TO postgres;


-- Completed on 2020-02-17 16:06:53

--
-- PostgreSQL database dump complete
--

