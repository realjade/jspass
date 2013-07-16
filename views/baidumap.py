# -*- coding: utf-8 -*-
from flask import Blueprint
from flask import request, session, url_for, redirect, \
        render_template, abort, g, flash, json, Response, make_response, current_app,send_file
from lib import const
import os
import string
import types

# Flask 模块对象
module = Blueprint('baidumap', __name__)


@module.route('/map')
def index():
    return render_template('map/map.html', tab = 'index')