--
-- PostgreSQL database dump
--

\restrict jC5vWLqptC4gqosiPXnib0MilZUaAFofrZ7Su7KzEPo55XoZdSrScxteuYbMb37

-- Dumped from database version 14.20 (Homebrew)
-- Dumped by pg_dump version 14.20 (Homebrew)

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
-- Name: public; Type: SCHEMA; Schema: -; Owner: macbookpro
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO macbookpro;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: macbookpro
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: enum_users_gender; Type: TYPE; Schema: public; Owner: tuanhoang
--

CREATE TYPE public.enum_users_gender AS ENUM (
    'male',
    'female'
);


ALTER TYPE public.enum_users_gender OWNER TO tuanhoang;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: nations; Type: TABLE; Schema: public; Owner: tuanhoang
--

CREATE TABLE public.nations (
    id bigint NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.nations OWNER TO tuanhoang;

--
-- Name: nations_id_seq; Type: SEQUENCE; Schema: public; Owner: tuanhoang
--

CREATE SEQUENCE public.nations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.nations_id_seq OWNER TO tuanhoang;

--
-- Name: nations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tuanhoang
--

ALTER SEQUENCE public.nations_id_seq OWNED BY public.nations.id;


--
-- Name: refresh_tokens; Type: TABLE; Schema: public; Owner: tuanhoang
--

CREATE TABLE public.refresh_tokens (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    token text NOT NULL,
    user_id uuid NOT NULL,
    expires_at timestamp with time zone NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.refresh_tokens OWNER TO tuanhoang;

--
-- Name: roles; Type: TABLE; Schema: public; Owner: tuanhoang
--

CREATE TABLE public.roles (
    id bigint NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.roles OWNER TO tuanhoang;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: tuanhoang
--

CREATE SEQUENCE public.roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_id_seq OWNER TO tuanhoang;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tuanhoang
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: tuanhoang
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    email character varying(255),
    username character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    full_name character varying(255),
    is_active boolean DEFAULT true,
    phone character varying(20),
    date_of_birth date,
    last_login timestamp without time zone,
    gender character varying(10),
    role_id bigint,
    nation_id bigint,
    bio text,
    is_verified boolean DEFAULT false,
    title character varying(100),
    avatar text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    twofa_enabled boolean DEFAULT false,
    CONSTRAINT users_gender_check CHECK (((gender)::text = ANY ((ARRAY['male'::character varying, 'female'::character varying])::text[])))
);


ALTER TABLE public.users OWNER TO tuanhoang;

--
-- Name: nations id; Type: DEFAULT; Schema: public; Owner: tuanhoang
--

ALTER TABLE ONLY public.nations ALTER COLUMN id SET DEFAULT nextval('public.nations_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: tuanhoang
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Data for Name: nations; Type: TABLE DATA; Schema: public; Owner: tuanhoang
--

COPY public.nations (id, name) FROM stdin;
1	Vietnam
2	United States
3	Canada
4	Australia
5	Germany
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: public; Owner: tuanhoang
--

COPY public.refresh_tokens (id, token, user_id, expires_at, created_at) FROM stdin;
d618ddb8-9269-468d-8365-5c4142583c31	32704f1149926a67d08165677b0fd9ef9bb7adb4885e93a00b6fc30f45fbc7c92be60da58ac183da3cd65a39e8589167f5ea6870220a73218ec5bbaa5199d07d	c2d9e3f7-4b6a-4b9d-a3b7-ced9d8ad12b1	2025-12-29 22:24:04.91+07	2025-12-22 22:24:04.91+07
181d8c92-1daf-4d25-897a-788c05206f0a	12b10fa06417421aa74031d491b53c82a55642c994e0d8030494c2df162541bd65d82afb4e92dfe58acbe6045d600964b568c5e15b36e6d63e512fc165591e0f	b7c8e8f4-d6e1-456d-9b45-8f6c4be3a4a3	2025-12-30 00:16:06.268+07	2025-12-23 00:16:06.269+07
e0f44f98-34ee-4f89-93ae-101c4ef418cc	08948908ff32b0ead800a49fa9754ac278f771133cd7b8a09827605c10abeb8cb25a8fc077d287252610a8efc513672963a092bfb9abedee94b609d9e35ce7b5	a5e1af2f-1f64-4fe7-a325-187935c3ff1c	2025-12-30 14:04:27.55+07	2025-12-23 14:04:27.55+07
ee7c1a29-3e8c-4068-82a5-ff9e45cc44ff	17957e1032039487706325e49d828dba1699838aef62ab11f67593d052725b16656d663f9554b57f25eecc3f0adb2edfe6857a92eb76f7f9d152ca9ddb6dba8f	a3f4d5d9-8d7b-4cda-8b89-4c65d4c7488f	2026-01-22 16:00:13.654+07	2026-01-15 16:00:13.654+07
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: tuanhoang
--

COPY public.roles (id, name) FROM stdin;
1	Admin
2	User
3	Manager
4	Moderator
5	Guest
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: tuanhoang
--

COPY public.users (id, email, username, password, full_name, is_active, phone, date_of_birth, last_login, gender, role_id, nation_id, bio, is_verified, title, avatar, created_at, updated_at, twofa_enabled) FROM stdin;
b7c8e8f4-d6e1-456d-9b45-8f6c4be3a4a3	le.thi@example.com	le.thi	$2b$10$RqjM80yy.5IpyxDlq18DR./pBey8aPdFKfL4KXagQ5Wr1xH4yrcM6	Lê Thị	t	0987654321	1992-02-02	2025-12-14 09:30:00	female	3	2	Bio of Lê Thị	t	Ms.	2025121702350_b7c8e8f4-d6e1-456d-9b45-8f6c4be3a4a3.jpeg	2025-12-15 15:42:51.00329	2025-12-16 17:23:50.302	\N
a3f4d5d9-8d7b-4cda-8b89-4c65d4c7488f	nguyen.tuan@example.com	nguyen.tuan	$2b$10$o0ia59acE2BhOqYFZVQ/wuO2xezEcpGJx.KVllhzTzq92m1npgHkS	Nguyễn Tuấn	t	1234567890	1990-01-01	2025-12-15 08:00:00	male	2	1	Bio of Nguyễn Tuấn	t	Mr.	2025121702240_a3f4d5d9-8d7b-4cda-8b89-4c65d4c7488f.jpeg	2025-12-15 15:42:51.00329	2025-12-16 17:22:40.499	\N
c2d9e3f7-4b6a-4b9d-a3b7-ced9d8ad12b1	pham.hung@example.com	pham.hung	$2b$10$6BCi222cLtkQE2iAJz59/ut8viTj5aiBetjjyilCDyHy/th4WlbVi	Phạm Hùng	t	1122334455	1985-03-03	2025-12-13 10:45:00	male	1	3	Bio of Phạm Hùng	f	Dr.	2025121716201_c2d9e3f7-4b6a-4b9d-a3b7-ced9d8ad12b1.jpeg	2025-12-15 15:42:51.00329	2025-12-17 09:20:01.816	\N
e8d1a6a2-42d1-4c35-a0f7-bc712cf6f121	hoang.minh@example.com	hoang.minh	$2b$10$uGw/V2iYWak64sk9qPaEQu4fwAhk5BMTC2EiYzlVP9aQdF8Hfnx3.	Hoàng Minh	t	2233445566	2000-05-05	2025-12-11 12:30:00	male	5	5	Bio of Hoàng Minh	t	Mr.	20251215224758_e8d1a6a2-42d1-4c35-a0f7-bc712cf6f121.jpeg	2025-12-15 15:42:51.00329	2025-12-15 15:47:58.965	\N
d4f8b4c6-a87a-48f0-9a8d-e2f3c1c46924	tran.hien@example.com	tran.hien	$2b$10$6vtaaiwOmMGroR5cM3OUVOywUt2ydN3w7eHO2eyxAebFtKPscU1PO	Trần Hiền	f	5566778899	1995-04-04	2025-12-12 11:50:00	female	4	4	Bio of Trần Hiền	f	Prof.	20251222222441_d4f8b4c6-a87a-48f0-9a8d-e2f3c1c46924.jpeg	2025-12-15 15:42:51.00329	2025-12-22 15:24:41.24	\N
a5e1af2f-1f64-4fe7-a325-187935c3ff1c	baotran2k2@gmail.com	bao.tran	$2b$10$nqiLHWjxtNZPDKO5eu8f8eQtI.PUjyUM7mXmWsGRFJbPkeZJHRJsS	Lê Thị Bảo Trân	t	0989849242	2002-12-31	\N	female	3	4	Người này là người tui ghét	f	Đồ đáng ghét	2025122314118_a5e1af2f-1f64-4fe7-a325-187935c3ff1c.jpeg	2025-12-23 07:00:48.531	2025-12-23 07:03:41.097	f
\.


--
-- Name: nations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tuanhoang
--

SELECT pg_catalog.setval('public.nations_id_seq', 5, true);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tuanhoang
--

SELECT pg_catalog.setval('public.roles_id_seq', 5, true);


--
-- Name: nations nations_pkey; Type: CONSTRAINT; Schema: public; Owner: tuanhoang
--

ALTER TABLE ONLY public.nations
    ADD CONSTRAINT nations_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: tuanhoang
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: tuanhoang
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: tuanhoang
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: tuanhoang
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: idx_email; Type: INDEX; Schema: public; Owner: tuanhoang
--

CREATE INDEX idx_email ON public.users USING btree (email);


--
-- Name: idx_username; Type: INDEX; Schema: public; Owner: tuanhoang
--

CREATE INDEX idx_username ON public.users USING btree (username);


--
-- Name: users fk_nation; Type: FK CONSTRAINT; Schema: public; Owner: tuanhoang
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_nation FOREIGN KEY (nation_id) REFERENCES public.nations(id);


--
-- Name: refresh_tokens fk_refresh_tokens_user; Type: FK CONSTRAINT; Schema: public; Owner: tuanhoang
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT fk_refresh_tokens_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: users fk_role; Type: FK CONSTRAINT; Schema: public; Owner: tuanhoang
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES public.roles(id);


--
-- PostgreSQL database dump complete
--

\unrestrict jC5vWLqptC4gqosiPXnib0MilZUaAFofrZ7Su7KzEPo55XoZdSrScxteuYbMb37

