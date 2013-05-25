# -*- coding: utf-8 -*-
from flask import Blueprint
from flask import request, session, url_for, redirect, \
        render_template, abort, g, flash, json, Response, make_response, current_app,send_file
import models as m
from models.user import User
from werkzeug import check_password_hash, generate_password_hash
from werkzeug import secure_filename
from sqlalchemy import or_,desc
import time
import pickle
import lib.utils as ut
from lib.wrappers import login_required
import lib.functions as f
from lib import const
import lib.datawrappers as dw
import os
import string
from random import choice
import types
import Image

# Flask 模块对象
module = Blueprint('photo', __name__)


@module.route('/reyi/', methods=['GET', 'POST'])
def photo():
    """index"""
    return render_template('photo/reyi.html')