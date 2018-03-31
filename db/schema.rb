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

ActiveRecord::Schema.define(version: 20180408043848) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cases", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "type_of_case"
    t.string "pro_bono_placement"
    t.string "grant"
    t.date "initial_invoice_date"
    t.date "last_invoice_date"
    t.date "date_rec_initial_disbursement"
    t.date "date_rec_last_disbursement"
    t.bigint "case_tracking"
    t.bigint "case_supervisor_id"
    t.string "program"
    t.string "legal_case_name"
    t.string "judge_assigned"
    t.string "trial_attorney"
    t.string "case_progress"
    t.date "date_biometrics_done"
    t.date "lodge_or_rn_date"
    t.date "date_mta_filed"
    t.string "asylum_officer"
    t.string "nexus_argued"
    t.string "nexus_granted"
    t.string "case_outcome"
    t.boolean "case_outcome_achieved"
    t.date "date_of_outcome"
    t.bigint "user_id"
    t.bigint "client_id"
    t.string "pdf_file_name"
    t.string "pdf_content_type"
    t.integer "pdf_file_size"
    t.datetime "pdf_updated_at"
  end

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
    t.string "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "user_name"
    t.string "details"
  end

  create_table "documents", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "pdf_file_name"
    t.string "pdf_content_type"
    t.integer "pdf_file_size"
    t.datetime "pdf_updated_at"
    t.bigint "case_id"
  end

  create_table "event_types", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "events", force: :cascade do |t|
    t.string "name"
    t.string "location"
    t.datetime "start_time"
    t.datetime "end_time"
    t.bigint "user_id"
    t.bigint "event_type_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_type_id"], name: "index_events_on_event_type_id"
    t.index ["user_id"], name: "index_events_on_user_id"
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

  create_table "event_types", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "events", force: :cascade do |t|
    t.string "name"
    t.string "location"
    t.datetime "start_time"
    t.datetime "end_time"
    t.bigint "user_id"
    t.bigint "event_type_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_type_id"], name: "index_events_on_event_type_id"
    t.index ["user_id"], name: "index_events_on_user_id"
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

  create_table "task_templates", force: :cascade do |t|
    t.text "description"
    t.integer "completion_time"
    t.boolean "prior"
    t.bigint "event_type_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "title"
    t.index ["event_type_id"], name: "index_task_templates_on_event_type_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.integer "completed_status", default: 0
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "client_id"
    t.string "title"
    t.datetime "due_date"
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
    t.string "avatar_file_name"
    t.string "avatar_content_type"
    t.integer "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.integer "role"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "notifications", "users"
  add_foreign_key "notifications", "users", column: "notified_by_id"
  add_foreign_key "tasks", "clients"
end
