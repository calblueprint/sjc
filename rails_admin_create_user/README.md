# RailsAdminCreateUser
This gem allows a developer to customize an action method of a class through
the Rails Admin dashboard

## Usage
This specifically applies to the User class so you will need to remove the
new action method from the User class and add the create_user action
config.actions do
    dashboard                     # mandatory
    index                         # mandatory
    new do
      except ['User']
    end
    create_user
    export
    bulk_delete
    show
    edit
    delete
    show_in_app
  end

## Installation
Add this line to your application's Gemfile:

```ruby
gem 'rails_admin_create_user'
```

And then execute:
```bash
$ bundle
```

Or install it yourself as:
```bash
$ gem install rails_admin_create_user
```

## License
The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
