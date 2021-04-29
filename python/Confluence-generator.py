#use in jupyter notbook/lab

import sqlalchemy
import pandas as pd 
import datetime
import json

%load_ext sql 

%sql postgresql://awsuser@redshift-<>.us-east-1.redshift.amazonaws.com:5439/dwh

with open('/Users/Menachemg/Documents/lang/python/conflu/def.json') as jf:
    t = json.loads(jf.read())
def add_tab_data(schame_name:str,of):
    my_schema = schame_name
    dt = %sql select tab.table_schema , \
       tab.table_name  , \
       tinf.tbl_rows as Number_of_rows\
        from svv_tables tab \
    left join svv_table_info tinf \
          on tab.table_schema = tinf.schema \
          and tab.table_name = tinf.table \
    where tab.table_type = 'BASE TABLE' \
      and tab.table_schema in(:my_schema) \
      and tab.table_name !='fivetran_audit' \
    order by tab.table_name ; 
    my_fd = dt.DataFrame()
    of.write('\n')
    of.write('Tables and statistics updated to: {} \n'.format(datetime.datetime.now().strftime('%Y-%m-%d %H:%M')))
    of.write('\n')
    of.write(my_fd.to_markdown(index=False))

def out_line(my_j:json,fname:str):
    j_to_print=['head','data','known']
    with open(my_j['fname'],'w') as mf:
        for i in my_j:
            if any(x in i for x in j_to_print):
                if i == 'head_f2':
                    mf.write(my_j[i]+'\n')
                elif i == 'head_f3':
                    mf.write(my_j[i].format(my_j['pipe_name'])+'\n')
                    mf.write('\n')
                elif i == 'head_f4':
                    mf.write('\n')
                    mf.write(my_j[i].format(my_j['pipe_name'],my_j['type'],my_j['src'])+'\n')
                    mf.write('\n')
                elif i == 'freq_data_data':
                    mf.write(my_j[i].format(my_j['src'],my_j['frq'],'')+'\n')
                    mf.write('\n')
                    mf.write('\n')
                else:
                    mf.write(my_j[i]+'\n')
        add_tab_data(my_j['name'],mf)
[out_line(x,'a1.txt') for n,x in enumerate(t['pages'])]

# use the upload_to_confluence  to upload to confluence 
