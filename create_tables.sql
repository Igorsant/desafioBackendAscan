create table users(
	id serial primary key,
	full_name varchar(256) not null,
	created_at date default current_date not null
);

create table subscriptions(
	id serial primary key,
	users_id integer references users not null,
	created_at date default current_date not null,
	updated_at date default current_date not null
);

create table status(
	id serial primary key,
	status varchar(40) not null
);

alter table subscriptions
add column status_id integer
references status;

create table event_history(
	id serial primary key,
	subscriptions_id integer references subscriptions,
	type varchar(30),
	created_at date default current_date
);

