CREATE TABLE `enquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`organisation` text NOT NULL,
	`topic` text NOT NULL,
	`message` text NOT NULL,
	`source` text NOT NULL,
	`payload_hash` text NOT NULL,
	`created_at` integer NOT NULL
);
