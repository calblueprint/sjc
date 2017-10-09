# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

def make_clients
  1.upto(10) do |n|
    client = Client.create(
      phone_number: Faker::PhoneNumber.phone_number,
      country: Faker::Address.country,
      state: Faker::Address.state,
      postal_code: Faker::Address.postcode,
      city: Faker::Address.city,
      street: Faker::Address.street_address,
      case_id: Faker::Number.number(10),
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name
    )
    client.id = n
    client.save
  end
end

make_clients

p "Created #{Client.count} clients"
