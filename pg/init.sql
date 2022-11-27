--
-- PostgreSQL database cluster dump
--

-- Started on 2022-11-13 12:29:18

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE api;
ALTER ROLE api WITH NOSUPERUSER NOINHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:kNLiemj0vzHOHKj539qkbw==$/d2AuFmNvwRzkGmv1P+7EOpcjOjjcGujfoH6nGR9b8U=:rqyYsGN/MeEpeKyNPIvBgGUWBgB0QyuUF+Pnato+Ing=';
--
-- User Configurations
--






--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4 (Debian 14.4-1.pgdg110+1)
-- Dumped by pg_dump version 15.0

-- Started on 2022-11-13 12:29:18

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
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 3306 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2022-11-13 12:29:19

--
-- PostgreSQL database dump complete
--

--
-- Database "eface" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4 (Debian 14.4-1.pgdg110+1)
-- Dumped by pg_dump version 15.0

-- Started on 2022-11-13 12:29:19

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
-- TOC entry 3330 (class 1262 OID 16384)
-- Name: eface; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE eface WITH TEMPLATE = template0 ENCODING = 'UTF8';


ALTER DATABASE eface OWNER TO postgres;

\connect eface

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
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 827 (class 1247 OID 16426)
-- Name: Emotes; Type: TYPE; Schema: public; Owner: api
--

CREATE TYPE public."Emotes" AS ENUM (
    'Neutral',
    'Happy',
    'Sad'
);


ALTER TYPE public."Emotes" OWNER TO api;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 211 (class 1259 OID 16434)
-- Name: AdminPermissions; Type: TABLE; Schema: public; Owner: api
--

CREATE TABLE public."AdminPermissions" (
    user_id integer NOT NULL
);


ALTER TABLE public."AdminPermissions" OWNER TO api;

--
-- TOC entry 210 (class 1259 OID 16398)
-- Name: Users; Type: TABLE; Schema: public; Owner: api
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    emotion public."Emotes" DEFAULT 'Neutral'::public."Emotes" NOT NULL
);


ALTER TABLE public."Users" OWNER TO api;

--
-- TOC entry 209 (class 1259 OID 16397)
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: api
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_id_seq" OWNER TO api;

--
-- TOC entry 3332 (class 0 OID 0)
-- Dependencies: 209
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: api
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- TOC entry 3175 (class 2604 OID 16401)
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: api
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- TOC entry 3324 (class 0 OID 16434)
-- Dependencies: 211
-- Data for Name: AdminPermissions; Type: TABLE DATA; Schema: public; Owner: api
--



--
-- TOC entry 3323 (class 0 OID 16398)
-- Dependencies: 210
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: api
--



--
-- TOC entry 3333 (class 0 OID 0)
-- Dependencies: 209
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: api
--

SELECT pg_catalog.setval('public."Users_id_seq"', 5, true);


--
-- TOC entry 3181 (class 2606 OID 16438)
-- Name: AdminPermissions AdminPermissions_pkey; Type: CONSTRAINT; Schema: public; Owner: api
--

ALTER TABLE ONLY public."AdminPermissions"
    ADD CONSTRAINT "AdminPermissions_pkey" PRIMARY KEY (user_id);


--
-- TOC entry 3179 (class 2606 OID 16406)
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: api
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- TOC entry 3177 (class 1259 OID 16412)
-- Name: Users_email_key; Type: INDEX; Schema: public; Owner: api
--

CREATE UNIQUE INDEX "Users_email_key" ON public."Users" USING btree (email);


--
-- TOC entry 3182 (class 2606 OID 16439)
-- Name: AdminPermissions AdminPermissions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: api
--

ALTER TABLE ONLY public."AdminPermissions"
    ADD CONSTRAINT "AdminPermissions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3331 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- TOC entry 2032 (class 826 OID 16389)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT,INSERT,DELETE,UPDATE ON TABLES  TO api;


-- Completed on 2022-11-13 12:29:19

--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4 (Debian 14.4-1.pgdg110+1)
-- Dumped by pg_dump version 15.0

-- Started on 2022-11-13 12:29:19

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
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 3306 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2022-11-13 12:29:19

--
-- PostgreSQL database dump complete
--

-- Completed on 2022-11-13 12:29:19

--
-- PostgreSQL database cluster dump complete
--

