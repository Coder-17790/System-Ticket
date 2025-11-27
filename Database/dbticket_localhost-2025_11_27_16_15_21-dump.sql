--
-- PostgreSQL database dump
--

-- Dumped from database version 16.10
-- Dumped by pg_dump version 16.9 (Homebrew)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    org_id bigint,
    email character varying NOT NULL,
    full_name character varying(255) NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    phone character varying(20),
    "position" text,
    date_of_birth date,
    last_login timestamp without time zone,
    address text,
    gender character varying(10),
    role character varying(50) DEFAULT 'user'::character varying,
    avatar_url text,
    bio text,
    is_verified boolean DEFAULT false,
    deleted_at timestamp without time zone,
    title character varying(100),
    language character varying(20),
    avatar text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, org_id, email, full_name, is_active, created_at, updated_at, phone, "position", date_of_birth, last_login, address, gender, role, avatar_url, bio, is_verified, deleted_at, title, language, avatar) FROM stdin;
1	2	ly.tran@demo.local	Lý Trần	t	2024-03-25 20:11:58+07	2024-09-01 19:25:43+07	+84900184302	Designer	1983-01-09	2025-09-29 12:38:39.300897	Hà Nội, Việt Nam	Nam	user	https://cdn.demo.local/avatars/user_32.jpg	Thích du lịch và cà phê sáng.	f	2025-10-15 18:04:50.67765	SilverBullet	Anh	/images/avatar_1.png
2	1	hai.vo@demo.local	Hải Võ	f	2024-11-04 16:59:00+07	2024-11-04 16:59:00+07	+84900719953	Developer	1988-07-20	2025-10-17 00:03:03.105049	Cần Thơ, Việt Nam	Nam	user	https://cdn.demo.local/avatars/user_45.jpg	Luôn học hỏi và phát triển bản thân.	t	\N	NightOwl	Singapore	/images/avatar_2.png
3	2	linh.dang@demo.local	Linh Đặng	t	2024-11-20 18:34:27+07	2025-02-22 19:00:00+07	+84900514319	Developer	2009-12-19	2025-09-04 07:08:02.674099	Đà Nẵng, Việt Nam	Nam	admin	https://cdn.demo.local/avatars/user_46.jpg	Yêu công nghệ và sáng tạo.	f	\N	CaptainCool	Đức	/images/avatar_3.png
4	1	huy.vo@demo.local	Huy Võ	f	2024-05-15 16:42:00+07	2024-05-15 16:42:00+07	+84900012976	Intern	1982-01-22	2025-11-03 23:21:30.353909	TP. Hồ Chí Minh, Việt Nam	Nam	moderator	https://cdn.demo.local/avatars/user_35.jpg	Luôn học hỏi và phát triển bản thân.	f	2025-11-16 06:24:03.748	LazyNinja	Canada	/images/avatar_4.png
5	1	lan.pham@demo.local	Lan Phạm	t	2024-09-15 17:10:45+07	2025-02-03 17:10:45+07	+84900971326	Manager	2004-07-25	2025-09-20 22:45:10.011065	Đà Nẵng, Việt Nam	Nữ	user	https://cdn.demo.local/avatars/user_41.jpg	Luôn học hỏi và phát triển bản thân.	t	2025-11-16 06:24:03.956	ShadowFox	Pháp	/images/avatar_5.png
6	2	toan.nguyen@demo.local	Toàn Nguyễn	t	2024-10-01 01:05:22+07	2025-05-03 04:15:33+07	+84900491053	Intern	2013-02-03	2025-09-23 21:46:08.445317	Đà Nẵng, Việt Nam	Nam	user	https://cdn.demo.local/avatars/user_42.jpg	Yêu công nghệ và sáng tạo.	t	2025-11-16 06:24:04.129	ThunderCat	Nhật Bản	/images/avatar_6.png
7	3	thao.le@demo.local	Thảo Lê	t	2024-10-12 19:25:16+07	2025-04-07 15:32:44+07	+84900252867	Developer	1990-07-18	2025-09-11 19:07:01.291032	TP. Hồ Chí Minh, Việt Nam	Nữ	user	https://cdn.demo.local/avatars/user_43.jpg	Yêu công nghệ và sáng tạo.	t	2025-11-16 06:24:04.547	MoonWalker	Úc	/images/avatar_7.png
8	1	phuc.ho@demo.local	Phúc Hồ	t	2024-10-29 20:37:58+07	2025-06-10 17:15:12+07	+84900205570	Manager	2002-05-03	2025-10-11 20:29:13.113874	TP. Hồ Chí Minh, Việt Nam	Nam	moderator	https://cdn.demo.local/avatars/user_44.jpg	Thích du lịch và cà phê sáng.	t	2025-11-16 06:28:27.876	ThunderCat	Nhật Bản	/images/avatar_8.png
9	2	phuong.tran@demo.local	Phương Trần	t	2025-01-06 23:42:12+07	2025-08-03 00:00:01+07	+84900712450	Developer	1998-07-26	2025-08-23 20:29:11.294925	Hà Nội, Việt Nam	Nữ	admin	https://cdn.demo.local/avatars/user_49.jpg	Thích du lịch và cà phê sáng.	t	\N	IronMan	Đức	/images/avatar_9.png
10	3	ngoc.pham@demo.local	Ngọc Phạm Yên	t	2024-04-14 17:20:31+07	2025-11-12 16:47:45.579+07	+84900871214	Designer	2010-03-23	2025-09-21 06:02:12.852902	Đà Nẵng, Việt Nam	Nữ	user	https://cdn.demo.local/avatars/user_33.jpg	Luôn học hỏi và phát triển bản thân.	t	\N	StormBreaker	Nhật Bản	/images/avatar_10.png
11	2	minh.tu@demo.local	Minh Tú	t	2024-05-20 16:10:22+07	2025-04-10 20:45:00+07	+84900293847	Manager	1995-06-11	2025-10-15 14:00:01.124558	Hà Nội, Việt Nam	Nam	user	https://cdn.demo.local/avatars/user_50.jpg	Đam mê học hỏi và sáng tạo.	t	\N	PixelMaster	Việt Nam	/images/avatar_11.png
12	1	an.nhat@demo.local	An Nhật	f	2024-04-21 18:18:45+07	2024-06-18 22:25:00+07	+84900827391	Intern	1999-08-01	2025-09-28 18:13:22.251329	Cần Thơ, Việt Nam	Nam	user	https://cdn.demo.local/avatars/user_51.jpg	Luôn trau dồi kiến thức và kỹ năng.	f	\N	SilentWave	Úc	/images/avatar_12.png
13	3	tuan.kien@demo.local	Tuấn Kiên	t	2024-06-18 17:35:00+07	2025-01-15 15:25:30+07	+84900481259	Designer	1996-04-05	2025-08-14 12:44:29.123456	Hồ Chí Minh, Việt Nam	Nam	moderator	https://cdn.demo.local/avatars/user_52.jpg	Thích sáng tạo và công nghệ.	t	\N	TechKnight	Mỹ	/images/avatar_13.png
14	2	quyen.hoa@demo.local	Quyền Hòa	t	2024-07-11 21:20:35+07	2025-02-22 17:10:56+07	+84900835167	Manager	1992-11-20	2025-11-01 13:10:45.343829	Đà Nẵng, Việt Nam	Nữ	user	https://cdn.demo.local/avatars/user_53.jpg	Yêu thích chia sẻ kiến thức và sáng tạo.	t	\N	GreenGiant	Đức	/images/avatar_14.png
15	1	nhan.trung@demo.local	Nhân Trung	f	2024-02-25 15:50:13+07	2024-11-22 18:12:18+07	+84900987211	Developer	1989-12-05	2025-07-12 09:02:10.238789	Hà Nội, Việt Nam	Nam	admin	https://cdn.demo.local/avatars/user_54.jpg	Sáng tạo và xây dựng tương lai.	f	\N	SkyWalker	Canada	/images/avatar_15.png
16	2	hoang.tu@demo.local	Hoàng Tú	t	2024-05-11 15:45:12+07	2025-03-25 17:50:01+07	+84900728390	Developer	1990-09-15	2025-09-10 13:23:12.654321	Hà Nội, Việt Nam	Nam	user	https://cdn.demo.local/avatars/user_55.jpg	Đam mê công nghệ và khám phá.	t	\N	CodeMaster	Việt Nam	/images/avatar_16.png
17	1	lien.mai@demo.local	Liên Mai	f	2024-04-14 00:52:33+07	2025-05-01 21:05:23+07	+84900912345	Intern	1997-05-20	2025-09-18 10:25:45.098765	TP. Hồ Chí Minh, Việt Nam	Nữ	user	https://cdn.demo.local/avatars/user_56.jpg	Tự học và cải tiến bản thân.	f	\N	Dreamer	Mỹ	/images/avatar_17.png
18	3	quang.son@demo.local	Quang Sơn	t	2024-07-29 19:12:00+07	2025-03-10 23:38:50+07	+84900325789	Manager	1985-12-10	2025-09-30 09:48:20.56789	Đà Nẵng, Việt Nam	Nam	admin	https://cdn.demo.local/avatars/user_57.jpg	Thích lãnh đạo và đổi mới.	t	\N	TechLeader	Nhật Bản	/images/avatar_18.png
19	2	ngoc.bich@demo.local	Ngọc Bích	f	2024-09-10 21:08:27+07	2025-05-14 19:27:12+07	+84900753832	Designer	1993-03-05	2025-10-02 16:12:18.345678	Cần Thơ, Việt Nam	Nữ	user	https://cdn.demo.local/avatars/user_58.jpg	Yêu nghệ thuật và sáng tạo.	t	\N	ArtisticSoul	Úc	/images/avatar_19.png
20	1	khoa.hieu@demo.local	Khoa Hiếu	t	2024-05-02 18:18:57+07	2025-06-18 21:15:43+07	+84900865112	Developer	1987-02-18	2025-09-22 10:05:55.234567	Hồ Chí Minh, Việt Nam	Nam	user	https://cdn.demo.local/avatars/user_59.jpg	Chuyên gia lập trình và phát triển phần mềm.	t	\N	CodeWarrior	Pháp	/images/avatar_20.png
21	2	hoa.phuong@demo.local	Hoa Phượng	t	2024-07-30 15:55:11+07	2025-05-10 16:42:18+07	+84900641875	Developer	1994-01-12	2025-11-10 08:25:31.987654	Hà Nội, Việt Nam	Nữ	user	https://cdn.demo.local/avatars/user_60.jpg	Đam mê sáng tạo và lập trình.	t	\N	TechGuru	Mỹ	/images/avatar_21.png
22	1	tuan.an@demo.local	Tuấn An	f	2024-03-25 17:23:45+07	2025-06-12 19:01:42+07	+84900930467	Intern	2000-04-18	2025-08-22 17:09:24.56789	TP. Hồ Chí Minh, Việt Nam	Nam	user	https://cdn.demo.local/avatars/user_61.jpg	Luôn trau dồi kỹ năng và học hỏi.	f	\N	FastLearner	Nhật Bản	/images/avatar_22.png
23	3	mai.khanh@demo.local	Mai Khánh	t	2024-09-05 23:38:21+07	2025-07-25 21:12:31+07	+84900738521	Manager	1987-11-01	2025-10-28 19:47:56.345678	Đà Nẵng, Việt Nam	Nam	admin	https://cdn.demo.local/avatars/user_62.jpg	Thích lãnh đạo và tạo động lực.	t	\N	Visionary	Úc	/images/avatar_23.png
24	2	son.hoang@demo.local	Sơn Hoàng	f	2024-08-21 00:09:57+07	2025-06-07 20:22:44+07	+84900842189	Designer	1991-09-25	2025-11-15 11:30:18.234567	Hà Nội, Việt Nam	Nam	user	https://cdn.demo.local/avatars/user_63.jpg	Chuyên gia thiết kế và sáng tạo.	t	\N	CreativeMind	Canada	/images/avatar_24.png
25	1	tien.kim@demo.local	Tiến Kim	t	2024-06-14 20:05:31+07	2025-04-29 22:47:12+07	+84900947200	Developer	1985-03-02	2025-09-12 09:30:13.123456	Hồ Chí Minh, Việt Nam	Nam	user	https://cdn.demo.local/avatars/user_64.jpg	Đam mê lập trình và công nghệ.	t	\N	CodeMaster	Việt Nam	/images/avatar_25.png
26	2	thuy.nguyen@demo.local	Thùy Nguyễn	t	2024-10-22 17:15:44+07	2025-09-13 21:20:21+07	+84900610236	Intern	1998-12-28	2025-08-11 11:04:56.987654	Cần Thơ, Việt Nam	Nữ	user	https://cdn.demo.local/avatars/user_65.jpg	Luôn tìm tòi và phát triển bản thân.	t	\N	FutureStar	Mỹ	/images/avatar_26.png
27	3	quy.son@demo.local	Quý Sơn	f	2024-05-17 19:38:20+07	2025-03-12 16:15:28+07	+84900731987	Manager	1990-06-04	2025-10-18 10:30:12.345678	Đà Nẵng, Việt Nam	Nam	user	https://cdn.demo.local/avatars/user_66.jpg	Chuyên gia quản lý và tổ chức.	t	\N	Leader	Singapore	/images/avatar_27.png
28	2	chinh.tran@demo.local	Chinh Trần	t	2024-04-30 18:23:01+07	2025-05-25 17:05:02+07	+84900731488	Designer	1992-11-09	2025-11-05 14:55:10.234567	Hà Nội, Việt Nam	Nam	user	https://cdn.demo.local/avatars/user_67.jpg	Chuyên gia thiết kế đồ họa.	t	\N	DesignHero	Việt Nam	/images/avatar_28.png
29	3	phu.hai@demo.local	Phú Hải	f	2024-08-15 21:40:32+07	2025-02-21 18:44:18+07	+84900982347	Manager	1988-10-29	2025-09-05 17:00:30.345678	Hồ Chí Minh, Việt Nam	Nam	user	https://cdn.demo.local/avatars/user_68.jpg	Yêu thích sáng tạo và giải quyết vấn đề.	t	\N	ProblemSolver	Pháp	/images/avatar_29.png
30	1	ly.kien@demo.local	Lý Kiên	t	2024-07-03 20:56:22+07	2025-06-16 16:22:38+07	+84900870123	Developer	1986-02-12	2025-09-14 15:38:02.234567	Hà Nội, Việt Nam	Nam	user	https://cdn.demo.local/avatars/user_69.jpg	Đam mê công nghệ và phát triển phần mềm.	t	\N	Techie	Mỹ	/images/avatar_30.png
31	2	tuong.vu@demo.local	Tường Vũ	t	2024-05-10 18:18:35+07	2025-04-20 17:25:15+07	+84900747856	Developer	1992-11-19	2025-09-11 09:25:35.123456	TP. Hồ Chí Minh, Việt Nam	Nam	user	https://cdn.demo.local/avatars/user_70.jpg	Thích lập trình và phát triển phần mềm.	t	\N	CodeMaster	Việt Nam	/images/avatar_31.png
32	3	thao.nguyen@demo.local	Thảo Nguyễn	f	2024-07-05 19:45:18+07	2025-02-10 15:15:42+07	+84900812345	Manager	1989-04-22	2025-11-08 15:32:11.234567	Đà Nẵng, Việt Nam	Nữ	admin	https://cdn.demo.local/avatars/user_71.jpg	Sáng tạo và phát triển giải pháp.	t	\N	Visionary	Singapore	/images/avatar_32.png
33	2	duy.kho@demo.local	Duy Khơ	t	2024-08-18 21:36:05+07	2025-03-10 19:27:55+07	+84900673890	Designer	1994-02-03	2025-09-19 10:40:21.456789	Hà Nội, Việt Nam	Nam	user	https://cdn.demo.local/avatars/user_72.jpg	Chuyên gia thiết kế đồ họa sáng tạo.	t	\N	DesignMaster	Nhật Bản	/images/avatar_33.png
34	1	kim.hoa@demo.local	Kim Hoa	t	2024-06-25 23:04:50+07	2025-05-19 20:11:00+07	+84900928295	Intern	2000-03-12	2025-09-24 12:31:00.123456	Cần Thơ, Việt Nam	Nữ	user	https://cdn.demo.local/avatars/user_73.jpg	Đam mê học hỏi và phát triển bản thân.	f	\N	Dreamer	Pháp	/images/avatar_34.png
35	3	hoang.minh@demo.local	Hoàng Minh	t	2024-08-11 17:26:12+07	2025-06-28 18:22:03+07	+84900793586	Developer	1991-05-08	2025-09-14 09:55:40.234567	Hà Nội, Việt Nam	Nam	user	https://cdn.demo.local/avatars/user_74.jpg	Yêu công nghệ và sáng tạo.	t	\N	TechExplorer	Canada	/images/avatar_35.png
36	2	le.thao@demo.local	Lê Thảo	f	2024-09-06 19:37:42+07	2025-05-14 17:27:22+07	+84900761234	Manager	1988-07-10	2025-09-27 13:12:11.345678	TP. Hồ Chí Minh, Việt Nam	Nữ	user	https://cdn.demo.local/avatars/user_75.jpg	Sáng tạo và phát triển giải pháp phần mềm.	f	\N	Strategist	Singapore	/images/avatar_36.png
37	3	nguyen.hieu@demo.local	Nguyễn Hiếu	t	2024-06-01 18:52:00+07	2025-03-22 17:15:12+07	+84900821345	Designer	1992-08-05	2025-09-15 16:25:42.345678	Hà Nội, Việt Nam	Nam	user	https://cdn.demo.local/avatars/user_76.jpg	Chuyên gia thiết kế đồ họa.	t	\N	DesignPro	Nhật Bản	/images/avatar_37.png
38	2	thuy.hoa@demo.local	Thùy Hoa	t	2024-05-20 17:11:13+07	2025-04-25 15:50:10+07	+84900657244	Intern	1998-11-15	2025-09-26 13:15:36.234567	TP. Hồ Chí Minh, Việt Nam	Nữ	user	https://cdn.demo.local/avatars/user_77.jpg	Yêu sáng tạo và học hỏi.	t	\N	Explorer	Pháp	/images/avatar_38.png
39	3	tuan.tu@demo.local	Tuấn Tú	f	2024-07-30 20:52:18+07	2025-02-18 16:42:43+07	+84900841532	Manager	1990-05-17	2025-09-22 14:30:25.123456	Hà Nội, Việt Nam	Nam	user	https://cdn.demo.local/avatars/user_78.jpg	Chuyên gia quản lý và lãnh đạo.	t	\N	Leader	Úc	/images/avatar_39.png
40	1	hoang.hieu@demo.local	Hoàng Hiếu	t	2024-06-20 17:11:39+07	2025-03-11 21:13:11+07	+84900723456	Developer	1986-09-05	2025-09-07 10:28:32.234567	TP. Hồ Chí Minh, Việt Nam	Nam	user	https://cdn.demo.local/avatars/user_79.jpg	Đam mê công nghệ và lập trình.	t	\N	TechMaster	Canada	/images/avatar_40.png
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 40, true);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: idx_users_org; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_users_org ON public.users USING btree (org_id);


--
-- Name: users users_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_org_id_fkey FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

