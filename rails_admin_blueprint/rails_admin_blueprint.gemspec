$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "rails_admin_blueprint/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "rails_admin_blueprint"
  s.version     = RailsAdminBlueprint::VERSION
  s.authors     = ["Franco"]
  s.email       = ["christopher.franco.m@gmail.com"]
  s.homepage    = "https://github.com/calblueprint/sjc"
  s.summary     = "Custom styling for blueprint project"
  s.description = "makes the styling consistent with the rest of app"
  s.license     = "MIT"

  s.files = Dir["{lib,vendor}/**/*", "MIT-LICENSE", "Rakefile", "README.md"]

  s.add_dependency "rails", "~> 5.1.5"
end
