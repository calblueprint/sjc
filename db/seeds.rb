# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# user seeds
def make_users_tasks
  flobo = User.create(first_name: "Flobo", last_name: "Fosho", password: "password", password_confirmation: "password", email: "flobo@gmail.com", role: 0)
  amy = User.create(first_name: "Shady", last_name: "Amy", password: "password", password_confirmation: "password", email: "amy@gmail.com", role: 1)
  client = Client.create(
    phone_number: FFaker::PhoneNumber.short_phone_number,
    country: FFaker::AddressUS.country,
    state: FFaker::AddressUS.state,
    postal_code: FFaker::AddressUS.zip_code,
    city: FFaker::AddressUS.city,
    street: FFaker::AddressUS.street_address,
    case_id: FFaker::SSN.ssn,
    first_name: FFaker::Name.first_name,
    last_name: FFaker::Name.last_name
  )
  flobo.tasks.create(completed_status: :active,
                     title: FFaker::Lorem.sentence(4),
                     description: FFaker::Lorem.sentence(10),
                     client_id: client.id,
                     due_date: FFaker::Time.datetime)
  flobo.tasks.create(completed_status: :active,
                     title: FFaker::Lorem.sentence(5),
                     description: FFaker::Lorem.sentence(10),
                     client_id: client.id,
                     due_date: FFaker::Time.datetime)
  flobo.tasks.create(completed_status: :archived,
                     title: FFaker::Lorem.sentence(4),
                     description: FFaker::Lorem.sentence(10),
                     client_id: client.id,
                     due_date: FFaker::Time.datetime)
end

# client seeds
def make_clients
  2.upto(11) do |n|
    client = Client.create(
      phone_number: FFaker::PhoneNumber.short_phone_number,
      country: FFaker::AddressUS.country,
      state: FFaker::AddressUS.state,
      postal_code: FFaker::AddressUS.zip_code,
      city: FFaker::AddressUS.city,
      street: FFaker::AddressUS.street_address,
      case_id: FFaker::SSN.ssn,
      first_name: FFaker::Name.first_name,
      last_name: FFaker::Name.last_name
    )
  end
end

def make_cases
  1.upto(3) do |n|
    c = Case.create(
      legal_case_name: FFaker::Book.title,
      case_progress: (0..5).to_a.sample,
      type_of_case: (0..2).to_a.sample
    )

    c.client = Client.find(1)
    c.user = User.find(1)
    c.save
  end
end

# comment seeds
def make_comments
  mdo = User.create(id: 3, first_name: "M", last_name: "Do", password: "password", password_confirmation: "password", email: "mdo@gmail.com")
  sigh = Client.create(
    phone_number: FFaker::PhoneNumber.short_phone_number,
    country: FFaker::AddressUS.country,
    state: FFaker::AddressUS.state,
    postal_code: FFaker::AddressUS.zip_code,
    city: FFaker::AddressUS.city,
    street: FFaker::AddressUS.street_address,
    case_id: FFaker::SSN.ssn,
    first_name: FFaker::Name.first_name,
    last_name: FFaker::Name.last_name
  )
  1.upto(5) do |n|
    comment = Comment.create(
      content: FFaker::HipsterIpsum.sentences,
    )

    comment.user = mdo
    comment.user_name = "M Do"
    comment.client = sigh
    comment.save
    comment.thread_id = comment.id
    comment.created_at = Time.now.strftime("on %b %d %Y at %I:%M%P")
    comment.details = comment.user_name.concat(" " + comment.created_at)
    comment.save
  end
  6.upto(10) do |n|
    comment = Comment.create(
      user_id: 10,
      content: FFaker::HipsterIpsum.sentences,
      thread_id: 10,
      client_id: 2,
      user_name: FFaker::Name.name
    )
    comment.created_at = Time.now.strftime("on %b %d %Y at %I:%M%P")
    comment.details = comment.user_name.concat(" " + comment.created_at)
    comment.save
  end
end

make_users_tasks
p "Created users"
make_clients
p "Created #{Client.count} clients"
make_cases
make_comments
p "Created #{Comment.count} comments"
