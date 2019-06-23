import json


def get_test_config():
    test_config = 'config.json'
    with open(test_config) as jsonfile:
        return json.load(jsonfile)
