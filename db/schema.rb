# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180215014439) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "clients", force: :cascade do |t|
    t.string "phone_number"
    t.string "country"
    t.string "state"
    t.string "postal_code"
    t.string "city"
    t.string "street"
    t.bigint "case_id"
    t.string "first_name"
    t.string "last_name"
    t.integer "stage", default: 1
    t.string "education"
    t.integer "client_income"
    t.integer "family_income"
    t.string "help"
    t.datetime "court_date"
    t.boolean "flee_country"
    t.boolean "citizen_spouse"
    t.boolean "citizen_child"
    t.string "victim_crime"
    t.boolean "living_w_parents"
    t.string "initial_intake"
  end

  create_table "comments", force: :cascade do |t|
    t.bigint "user_id"
    t.text "content"
    t.bigint "thread_id"
    t.bigint "client_id"
    t.string "user_name"
    t.string "details"
  end

  create_table "notifications", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "notified_by_id"
    t.string "notifiable_type"
    t.bigint "notifiable_id"
    t.integer "notification_type"
    t.boolean "read", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["notifiable_type", "notifiable_id"], name: "index_notifications_on_notifiable_type_and_notifiable_id"
    t.index ["notified_by_id"], name: "index_notifications_on_notified_by_id"
    t.index ["user_id"], name: "index_notifications_on_user_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.integer "completed_status", default: 0
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "client_id"
    t.index ["client_id"], name: "index_tasks_on_client_id"
  end

  create_table "tasks_users", id: false, force: :cascade do |t|
    t.bigint "task_id", null: false
    t.bigint "user_id", null: false
    t.index ["task_id"], name: "index_tasks_users_on_task_id"
    t.index ["user_id"], name: "index_tasks_users_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name"
    t.string "last_name"
    t.boolean "admin", default: false
    t.string "avatar_file_name"
    t.string "avatar_content_type"
    t.integer "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "notifications", "users"
  add_foreign_key "notifications", "users", column: "notified_by_id"
  add_foreign_key "tasks", "clients"
end
