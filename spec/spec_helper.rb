ENV['RACK_ENV'] = 'test'

require File.expand_path('../lib/pptgallery/app', File.dirname(__FILE__))

require 'rspec'
require 'rack/test'

set :environment, :test
set :run, false
set :raise_errors, true
set :logging, false

RSpec.configure do |conf|
	conf.include Rack::Test::Methods
end

def app
	PPTGallery::App
end

def clear_all
	FileUtils.rm_r(Dir.glob(File.join(upload_path, "**", "*.*")), {:force=>true})
	FileUtils.rm_r(Dir.glob(File.join(upload_path, "**")), {:force=>true})
end

def upload_path
	File.expand_path('uploads', File.dirname(__FILE__))
end

def fixture_path
	File.expand_path('fixtures', File.dirname(__FILE__))
end
