import requests
from . import utils


def test_delete():
    conf = utils.get_test_config()
    url = conf['host'] + conf['urls']['users'] + '/1'
    response = requests.delete(url)
    assert response.status_code == 204
