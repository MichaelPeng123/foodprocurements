import io
import csv

def parse_csv_content(csv_content):
    csv_file = io.StringIO(csv_content)
    csv_reader = csv.reader(csv_file)
    return list(csv_reader)

def write_csv_content(data):
    csv_buffer = io.StringIO()
    csv_writer = csv.writer(csv_buffer)
    csv_writer.writerows(data)
    return csv_buffer.getvalue() 