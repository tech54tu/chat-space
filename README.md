# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## membersテーブル

|Column  |Type   |Options                       |
|--------|-------|------------------------------|
|user_id |integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## messagesテーブル
|Column    |Type    |Options                       |
|----------|--------|------------------------------|
|body      |text    |                              |
|image     |string  |                              |
|created_at|datetime|null: false                   |
|user_id   |integer |null: false, foreign_key: true|
|group_id  |integer |null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## usersテーブル
|Column  |Type  |Options                        |
|--------|------|-------------------------------|
|nickname|string|null:false, unique: true, index|
|email   |string|null:false, unique: true       |
|password|string|null:false                     |

### Association
has_many :members
has_many :messages
has_many :groups, through: :menbers

## groupsテーブル
|Column|Type  |Options   |
|------|------|----------|
|name  |string|null:false|

### Association
has_many :members
has_many :messages
has_many :users, through: :menbers
