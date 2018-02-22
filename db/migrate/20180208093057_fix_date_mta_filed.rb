class FixDateMtaFiled < ActiveRecord::Migration[5.1]
  def change
    rename_column :cases, :data_mta_filed, :date_mta_filed
  end
end
