-- اجرا کنید در Supabase SQL Editor، بعد از تمام فایل‌های schema قبلی
-- این فایل ستون content پست‌ها و دوره‌ها را از آرایه بلاک‌های JSON قدیمی
-- به یک رشته HTML تبدیل می‌کند (برای ویرایشگر جدید TipTap)
-- فقط یک‌بار لازم است اجرا شود (بعد از تبدیل، ستون دیگر jsonb نیست و دوباره اجرا کردن این فایل اثری ندارد)

create or replace function escape_html(value text)
returns text as $$
  select replace(replace(replace(replace(replace(
    coalesce(value, ''),
    '&', '&amp;'), '<', '&lt;'), '>', '&gt;'), '"', '&quot;'), '''', '&#39;')
$$ language sql immutable;

create or replace function blocks_to_html(blocks jsonb)
returns text as $$
declare
  result text := '';
  blk jsonb;
  btype text;
  bdata jsonb;
  caption text;
  cite text;
begin
  if blocks is null or jsonb_typeof(blocks) <> 'array' then
    return '';
  end if;

  for blk in select * from jsonb_array_elements(blocks)
  loop
    btype := blk->>'type';
    bdata := blk->'data';

    if btype = 'text' then
      result := result || '<p>' || replace(escape_html(bdata->>'html'), E'\n', '<br>') || '</p>';

    elsif btype = 'image' then
      caption := bdata->>'caption';
      result := result || '<img src="' || escape_html(bdata->>'url') || '" alt="' || escape_html(coalesce(caption, '')) || '">';
      if coalesce(caption, '') <> '' then
        result := result || '<p>' || escape_html(caption) || '</p>';
      end if;

    elsif btype = 'quote' then
      cite := bdata->>'cite';
      result := result || '<blockquote><p>' || replace(escape_html(bdata->>'text'), E'\n', '<br>') || '</p>';
      if coalesce(cite, '') <> '' then
        result := result || '<p>— ' || escape_html(cite) || '</p>';
      end if;
      result := result || '</blockquote>';

    elsif btype = 'code' then
      result := result || '<pre><code>' || escape_html(bdata->>'code') || '</code></pre>';

    elsif btype = 'video' or btype = 'podcast' then
      result := result || '<p><a href="' || escape_html(bdata->>'url') || '">' || escape_html(bdata->>'url') || '</a></p>';
    end if;
  end loop;

  return result;
end;
$$ language plpgsql immutable;

-- تبدیل ستون content جدول posts از jsonb به text (HTML)
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_name = 'posts' and column_name = 'content' and data_type = 'jsonb'
  ) then
    alter table posts alter column content type text using blocks_to_html(content);
    alter table posts alter column content set default '';
    alter table posts alter column content set not null;
  end if;

  if exists (
    select 1 from information_schema.columns
    where table_name = 'courses' and column_name = 'content' and data_type = 'jsonb'
  ) then
    alter table courses alter column content type text using blocks_to_html(content);
    alter table courses alter column content set default '';
    alter table courses alter column content set not null;
  end if;
end $$;

drop function if exists blocks_to_html(jsonb);
drop function if exists escape_html(text);
