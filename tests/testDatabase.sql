--
-- PostgreSQL database dump
--

-- Dumped from database version 11.6 (Ubuntu 11.6-1.pgdg16.04+1)
-- Dumped by pg_dump version 12.1

-- Started on 2020-02-14 14:29:07

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
-- TOC entry 3894 (class 1262 OID 7263461)
-- Name: testDatabase; Type: DATABASE; Schema: -; Owner: IV1201
--

CREATE DATABASE testDatabase WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';


-- ALTER DATABASE testDatabase OWNER TO IV1201;

\connect testDatabase

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
-- TOC entry 3886 (class 0 OID 7428699)
-- Dependencies: 204
-- Data for Name: application; Type: TABLE DATA; Schema: public; Owner: IV1201
--

INSERT INTO public.application (application_id, person_id, time_of_submission, status, last_edited) OVERRIDING SYSTEM VALUE VALUES (9, 0, '2020-01-30 00:00:00', 2, NULL);
INSERT INTO public.application (application_id, person_id, time_of_submission, status, last_edited) OVERRIDING SYSTEM VALUE VALUES (30, 74, '2020-01-30 00:00:00', 0, NULL);
INSERT INTO public.application (application_id, person_id, time_of_submission, status, last_edited) OVERRIDING SYSTEM VALUE VALUES (33, 76, '2020-02-06 00:00:00', 0, NULL);
INSERT INTO public.application (application_id, person_id, time_of_submission, status, last_edited) OVERRIDING SYSTEM VALUE VALUES (10, 24, '2020-01-30 00:00:00', 2, NULL);
INSERT INTO public.application (application_id, person_id, time_of_submission, status, last_edited) OVERRIDING SYSTEM VALUE VALUES (34, 77, '2020-02-07 00:00:00', 2, NULL);
INSERT INTO public.application (application_id, person_id, time_of_submission, status, last_edited) OVERRIDING SYSTEM VALUE VALUES (35, 28, '2020-02-14 00:00:00', 0, NULL);
INSERT INTO public.application (application_id, person_id, time_of_submission, status, last_edited) OVERRIDING SYSTEM VALUE VALUES (40, 121, '2020-02-14 00:00:00', 0, NULL);
INSERT INTO public.application (application_id, person_id, time_of_submission, status, last_edited) OVERRIDING SYSTEM VALUE VALUES (2, 2, '2020-01-28 00:00:00', 2, '2020-02-14 14:28:35.968');


--
-- TOC entry 3880 (class 0 OID 7300584)
-- Dependencies: 198
-- Data for Name: availability; Type: TABLE DATA; Schema: public; Owner: IV1201
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


--
-- TOC entry 3881 (class 0 OID 7300594)
-- Dependencies: 199
-- Data for Name: competence; Type: TABLE DATA; Schema: public; Owner: IV1201
--

INSERT INTO public.competence (competence_id, name, language, competence_index) VALUES (1, 'Korvgrillning', 'sv-se', 1);
INSERT INTO public.competence (competence_id, name, language, competence_index) VALUES (2, 'Karuselldrift', 'sv-se', 2);
INSERT INTO public.competence (competence_id, name, language, competence_index) VALUES (3, 'Fårtämjning', 'sv-se', 3);
INSERT INTO public.competence (competence_id, name, language, competence_index) VALUES (4, 'Clown', 'sv-se', 4);
INSERT INTO public.competence (competence_id, name, language, competence_index) VALUES (5, 'Försäljning', 'sv-se', 5);


--
-- TOC entry 3882 (class 0 OID 7300599)
-- Dependencies: 200
-- Data for Name: competence_profile; Type: TABLE DATA; Schema: public; Owner: IV1201
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


--
-- TOC entry 3879 (class 0 OID 7300571)
-- Dependencies: 197
-- Data for Name: person; Type: TABLE DATA; Schema: public; Owner: IV1201
--

INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (2, 'Per', 'Strand', '19671212-1211', 'per@strand.kth.se', NULL, 2, NULL, NULL);
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (28, 'fd', 'gh', '2020-01-16', '23@sd', '1234', 2, '1234', 'b79e444a32f7010b69220bcc7a494301cfcd5ce88065e5284a8f38d1fd3ada1a6918d4aee7cada3c9c1cd5eac764b08336ad0f285c0a8ada3a688e253721b9ff');
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (120, 'newuser', 'abc', '2020-02-13', 'newuser@newuse.com', 'newuser', 2, 'newuser', NULL);
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (0, 'Jakob', 'Molin', '1997-07-04', 'abc@gmail.com', 'abc123', 2, 'raskpask', NULL);
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (121, 'hejhejhej', 'hejhejhej', '0001-01-01', 'hejhejhej@hej.se', 'hejhejhej', 2, 'hejhejhej', 'c5ba67fc29c586abb5ec968c182f5f3cf179580e7e156d74797d2de2b370ecc36a20b54b1538f45cc3daeeda59a6ba8a4b5eddb95d64147faeeffe05ec791d98');
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (26, 'Pebo', 'Hamza', '1998-03-28', 'kkkkk@hotmail.com', 'pebo', 2, 'pebo', NULL);
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (75, 'hej', 'hej', '0002-01-01', 'hej@hej.se', 'hejhejhej', 2, 'hej', NULL);
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (74, 'test', 'testsson', '0001-01-01', 'test@test.se', 'testtest', 2, 'test', NULL);
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (76, 'hejhej', 'hejhej', '0001-01-01', 'hejhej@hej.hej', 'hejhej1', 2, 'hejhej', NULL);
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (27, 'kfgsuijodhyui+´wesdklfjnm,cvhuidkfendiov', 'ockidfgjvhbfopkxnhi0rsjokbnwj+qoskåhbjpne0m9pdf,o', '2017-11-28', 'dfghkmdoghmdghnmdghmpod@kjbidbidin.se', 'ehmkriohkm,eiohkm,iodfhiopdfhm,', 2, 'ndhjoehjeorhjoiet', 'f67778aa266cea0e29b0dc26124ec4306c5379dbc625ba25fc9392a8b207008d928eead993ba9735d27421f5dc870a626e2b9d7523f1c06c4f1c72d82d058054');
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (90, 'donpebo', 'dd', '2020-02-07', 'd@d.com', 'dddddddd', 2, 'd', NULL);
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (24, '1', 'asd', '1231-12-01', 'as', 'jakob', 2, 'JakobMolin', NULL);
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (93, 'donpebo', 'do', '2020-02-01', 'do@d.com', 'sssssss', 2, 's', NULL);
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (94, 'donpebo', 'd', '2020-02-06', 'pebo@pebo.com', 'sssssss', 2, 'ss', NULL);
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (96, 'donpebo', 'd', '2020-02-07', 'd@d.com', 'ppppppp', 2, 'p', NULL);
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (79, 'ko', 'ja', '10-10-2000', 'hej@has.sa', 'dsdfesa', 2, 'hesdfsdj', NULL);
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (29, 'jakob', 'jakob', '1111-01-01', 'jakob', 'jakob', 2, 'Jakob', NULL);
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (69, 'a', 'a', '0001-01-01', 'a@a.ae', 'asdfghj', 2, 'asd', NULL);
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (70, NULL, NULL, NULL, NULL, NULL, 2, NULL, NULL);
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (71, 'asd', 'asd', '0001-01-01', 'asd@dfs.se', 'aaaaaaa', 2, 'sdasd', NULL);
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (73, 'asd', 'asd', '0001-01-01', 'asd@dfs.se', 'aaaaaaa', 2, 'sdasdasd', NULL);
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (88, 'donpebo', 'donpebo', '2020-02-01', 'don@pebo.com', 'donpebo', 2, 'donpebo', '5275e873e37cec78207268c51cb7b03973df1707a4bfb2262fac0eb2146538315480918a088dcfec3751c2d8d033c6f9dfad9a57bd9316b5558c3319bc4f54ed');
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (1, 'Greta', 'Borg', NULL, NULL, 'wl9nk23a', 1, 'borg', 'f8103221a08a8cca94d24478f957e390b315e4493cdb19a6eed319e02107af021b8032c5e82249243c89071cc4190ed488fb4b989891caeb9105742552e00a8b');
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (117, 'pebo', 'pebo', '2020-02-07', 'p@p.com', 'sssssss', 2, 'pebo1', NULL);
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (87, 'fd', 'dfs', '2020-02-03', 'sdf@dfgdgf.sdf', 'HejHejHej', 2, 'Rikard', 'b27fc2458a7f88f51ea925bf8731c146b2d26719211cf801de8dd02f85d606f433d5aee4c85ec7dcd5f081f6d41edd365972369bb19cff3ff25c1de4295e04f5');
INSERT INTO public.person (person_id, name, surname, ssn, email, password, role_id, username, token) OVERRIDING SYSTEM VALUE VALUES (77, 'Jakob', 'Molin', '0123-01-01', 'jak@gmail.com', 'hello12', 2, 'hello', NULL);


--
-- TOC entry 3878 (class 0 OID 7300566)
-- Dependencies: 196
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: IV1201
--

INSERT INTO public.role (role_id, name) VALUES (1, 'recruit');
INSERT INTO public.role (role_id, name) VALUES (2, 'applicant');


--
-- TOC entry 3900 (class 0 OID 0)
-- Dependencies: 203
-- Name: application_application_id_seq; Type: SEQUENCE SET; Schema: public; Owner: IV1201
--

SELECT pg_catalog.setval('public.application_application_id_seq', 41, true);


--
-- TOC entry 3901 (class 0 OID 0)
-- Dependencies: 205
-- Name: availability_availability_id_seq; Type: SEQUENCE SET; Schema: public; Owner: IV1201
--

SELECT pg_catalog.setval('public.availability_availability_id_seq', 32, true);


--
-- TOC entry 3902 (class 0 OID 0)
-- Dependencies: 206
-- Name: competence_competence_index_seq; Type: SEQUENCE SET; Schema: public; Owner: IV1201
--

SELECT pg_catalog.setval('public.competence_competence_index_seq', 8, true);


--
-- TOC entry 3903 (class 0 OID 0)
-- Dependencies: 202
-- Name: competence_profile_competence_profile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: IV1201
--

SELECT pg_catalog.setval('public.competence_profile_competence_profile_id_seq', 135, true);


--
-- TOC entry 3904 (class 0 OID 0)
-- Dependencies: 201
-- Name: person_person_id_seq; Type: SEQUENCE SET; Schema: public; Owner: IV1201
--

SELECT pg_catalog.setval('public.person_person_id_seq', 121, true);


-- Completed on 2020-02-14 14:29:24

--
-- PostgreSQL database dump complete
--

