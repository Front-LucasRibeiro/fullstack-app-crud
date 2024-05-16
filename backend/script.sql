CREATE DATABASE db_fullstack_app
  WITH
  OWNER = db_fullstack_app
  ENCODING = 'UTF8'
  LC_COLLATE = 'en_US.utf8'
  LC_CTYPE = 'en_US.utf8'
  LOCALE_PROVIDER = 'libc'
  TABLESPACE = pg_default
  CONNECTION LIMIT = -1
  IS_TEMPLATE = False;

CREATE TABLE IF NOT EXISTS public.users
(
  id uuid NOT NULL,
  name character varying COLLATE pg_catalog."default" NOT NULL,
  email character varying COLLATE pg_catalog."default" NOT NULL,
  password character varying COLLATE pg_catalog."default" NOT NULL,
  created_at character varying COLLATE pg_catalog."default",
  "updateAt" character varying COLLATE pg_catalog."default",
  deleted_at character varying COLLATE pg_catalog."default",
  CONSTRAINT users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
  OWNER to db_fullstack_app;