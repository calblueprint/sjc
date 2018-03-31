module Abilities
  class AttorneyAbility
    include CanCan::Ability

    def initialize(user)
      user ||= User.new
      can :manage, :all
    end

  end
end
