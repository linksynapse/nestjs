PGDMP  .                    |            testgres    16.1    16.1 	    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16398    testgres    DATABASE     y   CREATE DATABASE testgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Korean_Korea.949';
    DROP DATABASE testgres;
                postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                pg_database_owner    false            �           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   pg_database_owner    false    4            �            1259    16399    SY.USER    TABLE     �  CREATE TABLE public."SY.USER" (
    user_id character varying NOT NULL,
    user_pw character varying NOT NULL,
    employee_id character varying,
    language character varying DEFAULT 'ko'::character varying NOT NULL,
    roles text[],
    enable boolean DEFAULT false NOT NULL,
    activated_dt timestamp without time zone,
    created_dt timestamp without time zone DEFAULT now() NOT NULL,
    suspensed_dt timestamp without time zone,
    expiration_dt timestamp without time zone
);
    DROP TABLE public."SY.USER";
       public         heap    postgres    false    4            �          0    16399    SY.USER 
   TABLE DATA           �   COPY public."SY.USER" (user_id, user_pw, employee_id, language, roles, enable, activated_dt, created_dt, suspensed_dt, expiration_dt) FROM stdin;
    public          postgres    false    215   U	                  1259    16420    sy_user_id_idx    INDEX     N   CREATE UNIQUE INDEX sy_user_id_idx ON public."SY.USER" USING btree (user_id);
 "   DROP INDEX public.sy_user_id_idx;
       public            postgres    false    215            �   �   x�m�KK�@��3��E�v��M3��Z�-�+��LA'i����XT������~&��>8ɪ+s���w1�2kj�����i$����as�8.���ErIʊ�.U��T�4Z<���D��� ��쁸 ��/���%mu�j�oW%��&�Ϻ٠+�eO�q�=LS��H���s{���z�n����_�<�{���`����\�gC�3J�;)M�     