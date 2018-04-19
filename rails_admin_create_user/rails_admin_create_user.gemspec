$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "rails_admin_create_user/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "rails_admin_create_user"
  s.version     = RailsAdminCreateUser::VERSION
  s.authors     = ["Franco"]
  s.email       = ["christopher.franco.m@gmail.com"]
  s.homepage    = "https://github.com/calblueprint/sjc"
  s.summary     = "action extension"
  s.description = "replaces action of admin for users"
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.md"]

  s.add_dependency "rails", "~> 5.1.6"
end
