-- ShowSync Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─────────────────────────────────────
-- USERS
-- ─────────────────────────────────────
create table users (
  id uuid primary key references auth.users on delete cascade,
  email text unique not null,
  full_name text,
  phone text,
  avatar_url text,
  role text default 'user' check (role in ('user', 'admin')),
  favorite_genres text[],
  preferred_language text default 'English',
  created_at timestamp with time zone default now()
);

-- ─────────────────────────────────────
-- MOVIES
-- ─────────────────────────────────────
create table movies (
  id uuid primary key default uuid_generate_v4(),
  tmdb_id integer unique,
  title text not null,
  overview text,
  poster_path text,
  backdrop_path text,
  release_date date,
  duration_minutes integer,
  genre text[],
  language text,
  rating decimal(3,1),
  trailer_url text,
  status text default 'upcoming' check (status in ('upcoming', 'now_showing', 'archived')),
  created_at timestamp with time zone default now()
);

-- ─────────────────────────────────────
-- THEATRES
-- ─────────────────────────────────────
create table theatres (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  location text not null,
  city text not null,
  latitude decimal(10,8),
  longitude decimal(11,8),
  image_url text,
  rating decimal(2,1),
  facilities text[],
  is_active boolean default true,
  created_at timestamp with time zone default now()
);

-- ─────────────────────────────────────
-- SCREENS
-- ─────────────────────────────────────
create table screens (
  id uuid primary key default uuid_generate_v4(),
  theatre_id uuid references theatres on delete cascade,
  name text not null,
  screen_type text default 'standard' check (screen_type in ('standard', 'imax', '4dx', 'dolby')),
  total_seats integer not null
);

-- ─────────────────────────────────────
-- SEATS
-- ─────────────────────────────────────
create table seats (
  id uuid primary key default uuid_generate_v4(),
  screen_id uuid references screens on delete cascade,
  row_label text not null,
  seat_number integer not null,
  seat_type text default 'silver' check (seat_type in ('silver', 'gold', 'platinum', 'recliner')),
  price decimal(8,2) not null,
  unique (screen_id, row_label, seat_number)
);

-- ─────────────────────────────────────
-- SHOWS
-- ─────────────────────────────────────
create table shows (
  id uuid primary key default uuid_generate_v4(),
  movie_id uuid references movies on delete cascade,
  screen_id uuid references screens on delete cascade,
  show_time timestamp with time zone not null,
  language text default 'English',
  format text default '2D' check (format in ('2D', '3D', 'IMAX', '4DX', 'Dolby')),
  is_active boolean default true,
  created_at timestamp with time zone default now()
);

-- ─────────────────────────────────────
-- BOOKINGS
-- ─────────────────────────────────────
create table bookings (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users on delete set null,
  show_id uuid references shows on delete set null,
  status text default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
  total_amount decimal(10,2) not null,
  convenience_fee decimal(8,2) default 0,
  created_at timestamp with time zone default now()
);

-- ─────────────────────────────────────
-- TICKETS
-- ─────────────────────────────────────
create table tickets (
  id uuid primary key default uuid_generate_v4(),
  booking_id uuid references bookings on delete cascade,
  seat_id uuid references seats,
  qr_code text unique,
  is_scanned boolean default false
);

-- ─────────────────────────────────────
-- SNACKS
-- ─────────────────────────────────────
create table snacks (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  price decimal(8,2) not null,
  category text default 'snack' check (category in ('popcorn', 'beverage', 'snack', 'combo')),
  image_url text,
  is_available boolean default true
);

-- ─────────────────────────────────────
-- SNACK ORDERS
-- ─────────────────────────────────────
create table snack_orders (
  id uuid primary key default uuid_generate_v4(),
  booking_id uuid references bookings on delete cascade,
  snack_id uuid references snacks,
  quantity integer not null,
  delivery_time text default 'before' check (delivery_time in ('before', 'interval', 'seat')),
  total_price decimal(8,2) not null
);

-- ─────────────────────────────────────
-- EVENTS
-- ─────────────────────────────────────
create table events (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  category text check (category in ('concert', 'comedy', 'sports', 'workshop', 'festival')),
  venue text not null,
  city text not null,
  event_date timestamp with time zone not null,
  price decimal(8,2),
  image_url text,
  is_active boolean default true,
  created_at timestamp with time zone default now()
);

-- ─────────────────────────────────────
-- REVIEWS
-- ─────────────────────────────────────
create table reviews (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users on delete set null,
  target_type text check (target_type in ('movie', 'theatre')),
  target_id uuid not null,
  overall_rating integer check (overall_rating between 1 and 5),
  story_rating integer,
  acting_rating integer,
  music_rating integer,
  seat_rating integer,
  sound_rating integer,
  screen_rating integer,
  cleanliness_rating integer,
  review_text text,
  is_verified boolean default false,
  is_approved boolean default false,
  created_at timestamp with time zone default now()
);

-- ─────────────────────────────────────
-- PAYMENTS
-- ─────────────────────────────────────
create table payments (
  id uuid primary key default uuid_generate_v4(),
  booking_id uuid references bookings on delete set null,
  razorpay_order_id text unique,
  razorpay_payment_id text unique,
  amount decimal(10,2) not null,
  status text default 'pending' check (status in ('pending', 'success', 'failed', 'refunded')),
  created_at timestamp with time zone default now()
);

-- ─────────────────────────────────────
-- CANCELLATIONS
-- ─────────────────────────────────────
create table cancellations (
  id uuid primary key default uuid_generate_v4(),
  booking_id uuid references bookings on delete set null,
  user_id uuid references users on delete set null,
  reason text,
  refund_amount decimal(10,2),
  refund_percent integer,
  status text default 'requested' check (status in ('requested', 'processed', 'rejected')),
  created_at timestamp with time zone default now()
);

-- ─────────────────────────────────────
-- INDEXES
-- ─────────────────────────────────────
create index idx_shows_movie on shows(movie_id);
create index idx_shows_screen on shows(screen_id);
create index idx_bookings_user on bookings(user_id);
create index idx_bookings_show on bookings(show_id);
create index idx_tickets_booking on tickets(booking_id);
create index idx_reviews_target on reviews(target_id);
create index idx_snack_orders_booking on snack_orders(booking_id);

-- ─────────────────────────────────────
-- ROW LEVEL SECURITY (RLS)
-- ─────────────────────────────────────
alter table users enable row level security;
alter table bookings enable row level security;
alter table tickets enable row level security;
alter table snack_orders enable row level security;
alter table payments enable row level security;
alter table cancellations enable row level security;
alter table reviews enable row level security;

-- Users can only see/edit their own data
create policy "Users can view own profile" on users for select using (auth.uid() = id);
create policy "Users can update own profile" on users for update using (auth.uid() = id);

-- Users can view their own bookings
create policy "Users see own bookings" on bookings for select using (auth.uid() = user_id);
create policy "Users create own bookings" on bookings for insert with check (auth.uid() = user_id);

-- Users can see their own tickets
create policy "Users see own tickets" on tickets for select using (
  exists (select 1 from bookings where bookings.id = tickets.booking_id and bookings.user_id = auth.uid())
);

-- Public read access for movies, theatres, shows, events
create policy "Public movies" on movies for select using (true);
create policy "Public theatres" on theatres for select using (true);
create policy "Public shows" on shows for select using (true);
create policy "Public events" on events for select using (true);
create policy "Public snacks" on snacks for select using (true);
create policy "Public seats" on seats for select using (true);
create policy "Public screens" on screens for select using (true);

-- Approved reviews are publicly visible
create policy "Public approved reviews" on reviews for select using (is_approved = true);
