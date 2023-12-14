CREATE TABLE `ImgFlipMemes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`dateString` text,
	`name` text,
	`url` text,
	`width` integer,
	`height` integer,
	`box_count` integer,
	`captions` integer
);
