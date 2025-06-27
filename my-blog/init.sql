-- 创建文章表
create table articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  slug text unique not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  is_published boolean default false,
  tags text[] default '{}'
);